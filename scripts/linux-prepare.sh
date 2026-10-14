#!/bin/bash

# run for local builds, not in Github Actions

# Debian/Ubuntu-specific environment cleanup
if [ -f /etc/debian_version ]; then
    # clean snap-specific environment variables, preserve system paths
    unset GTK_EXE_PREFIX
    unset GTK_PATH
    unset GTK_IM_MODULE_FILE
    unset GIO_MODULE_DIR
    unset GSETTINGS_SCHEMA_DIR
    unset LD_LIBRARY_PATH
    unset LOCPATH
    unset BAMF_DESKTOP_FILE_HINT
    unset GIO_LAUNCHED_DESKTOP_FILE

    # restore system XDG_DATA_DIRS without snap paths
    export XDG_DATA_DIRS="/usr/local/share:/usr/share:/var/lib/snapd/desktop"
fi

# RedHat/Fedora-specific environment setup
# if [ -f /etc/redhat-release ]; then
# fi

# load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# execute command passed as arguments
exec "$@"
