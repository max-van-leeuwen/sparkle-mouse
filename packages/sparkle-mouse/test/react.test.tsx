// type tests for sparkle-mouse/react, checked by npm run typecheck (not run, not published)



import { useRef } from 'react';
import SparkleMouse from 'sparkle-mouse';
import { SparkleMouseCanvas } from 'sparkle-mouse/react';
import DefaultExport from 'sparkle-mouse/react';



// valid usage
function Valid() {
    const ref = useRef<SparkleMouse>(null);
    return (
        <>
            <SparkleMouseCanvas />
            <DefaultExport sparkle="/template.sparkle" />
            <SparkleMouseCanvas
                ref={ref}
                sparkle={{ ...SparkleMouse.defaultSparkle, 'amount': 0.5 }}
                scale={2}
                paused
                cursorTracking={false}
                outOfViewRendering={false}
                onStart={(sparkleMouse) => sparkleMouse.drawAtScreenPosition(10, 10)}
                onError={(error) => console.warn(error)}
                id="sparkles"
                className="fx"
                width={300}
                style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}
                onClick={(event) => event.currentTarget.getContext('2d')}
            />
            <SparkleMouseCanvas ref={(sparkleMouse) => { if (sparkleMouse) sparkleMouse.pause(); }} />
        </>
    );
}



// invalid usage, each prop must fail to type check
function Invalid() {
    const wrongRef = useRef<HTMLDivElement>(null);
    return (
        <>
            {/* @ts-expect-error number instead of sparkle data */}
            <SparkleMouseCanvas sparkle={42} />
            {/* @ts-expect-error unknown mouse-state */}
            <SparkleMouseCanvas sparkle={{ ...SparkleMouse.defaultSparkle, 'mouse-state': 'hover' }} />
            {/* @ts-expect-error scale must be a number */}
            <SparkleMouseCanvas scale="2" />
            {/* @ts-expect-error onStart receives a SparkleMouse */}
            <SparkleMouseCanvas onStart={(sparkleMouse: string) => sparkleMouse} />
            {/* @ts-expect-error ref is for a SparkleMouse, not an element */}
            <SparkleMouseCanvas ref={wrongRef} />
            {/* @ts-expect-error unknown prop */}
            <SparkleMouseCanvas sparkels="/template.sparkle" />
        </>
    );
}



export { Valid, Invalid };
