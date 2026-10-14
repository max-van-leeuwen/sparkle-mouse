#!/bin/bash

# collect npm and cargo dependencies with licenses, repositories, authors

set -e  # Exit on error

OUTPUT_FILE="src-tauri/attribution.txt"

echo "Generating attribution.txt..."

{
    echo -e "name\tversion\tlicense\trepository\tauthors"
    
    # NPM packages (production only)
    npx license-checker --production --json | jq -r '
        to_entries[] | 
        # Parse package name and version
        (.key | split("@") | 
            if length == 2 then . 
            elif length == 3 then ["@" + .[1], .[2]] 
            else . 
            end
        ) as $parts | 
        # Skip the main sparkle-mouse package
        select($parts[0] != "sparkle-mouse") |
        # Try to read author/contributors from package.json
        (if (.value.path + "/package.json" | test(".")) then 
            ([.value.path + "/package.json"] | 
                map(try input catch empty) | 
                .[0] | 
                (.author // .contributors // [] | 
                    if type == "array" then join("; ") 
                    elif type == "object" then .name 
                    elif . then . 
                    else "" 
                    end
                )
            ) 
        else "" 
        end | gsub("<[^>]+>"; "") | gsub("\\s+"; " ") | gsub("^\\s+|\\s+$"; "")) as $author | 
        # Output tab-separated line for better URL clickability
        "\($parts[0])\t\($parts[1])\t\(.value.licenses // "NONE")\t\(.value.repository // "")\t\($author)"
    ' --slurpfile dummy /dev/null
    
    # Cargo packages, output as JSON first for processing
    cd src-tauri && cargo metadata --format-version 1 | jq -c '
        .packages[] | 
        select(.name != "sparkle-mouse") |
        {
            name: .name,
            version: .version,
            license: .license,
            license_file: .license_file,
            manifest_path: .manifest_path,
            repository: .repository,
            authors: (.authors | map(gsub("<[^>]+>"; "") | gsub("\\s+"; " ") | gsub("^\\s+|\\s+$"; "")) | join("; "))
        }
    ' | while IFS= read -r pkg; do
        name=$(echo "$pkg" | jq -r '.name')
        version=$(echo "$pkg" | jq -r '.version')
        license=$(echo "$pkg" | jq -r '.license // empty')
        license_file=$(echo "$pkg" | jq -r '.license_file // empty')
        manifest_path=$(echo "$pkg" | jq -r '.manifest_path')
        repository=$(echo "$pkg" | jq -r '.repository // ""')
        authors=$(echo "$pkg" | jq -r '.authors')
        
        # if no license field, try to detect 'MIT' from license file
        if [ -z "$license" ] && [ -n "$manifest_path" ]; then
            pkg_dir=$(dirname "$manifest_path")
            for lic_file in "$pkg_dir/LICENSE" "$pkg_dir/LICENSE.txt" "$pkg_dir/LICENSE-MIT"; do
                if [ -f "$lic_file" ] && head -1 "$lic_file" | grep -qi "MIT"; then
                    license="MIT"
                    break
                fi
            done
            [ -z "$license" ] && license="NONE"
        fi
        
        echo -e "${name}\t${version}\t${license}\t${repository}\t${authors}"
    done
} | sort -u > "$OUTPUT_FILE"

echo "Done: $OUTPUT_FILE"
