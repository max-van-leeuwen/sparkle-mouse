// type tests for sparkle-mouse, checked by npm run typecheck (not run, not published)



import SparkleMouse from 'sparkle-mouse';
import type { SparkleSettings, SparkleSettingsInput, SparkleShape, SparkleCanvasRect } from 'sparkle-mouse';



// valid usage
async function valid() {
    const canvas = document.createElement('canvas');
    const a = new SparkleMouse();
    const b = new SparkleMouse(canvas, 1.5);

    await a.start();
    await a.start('/template.sparkle');
    await b.start({ ...SparkleMouse.defaultSparkle, 'amount': 0.2, 'mouse-state': 'still' });

    a.setCursorTracking(false);
    const tracking: boolean = a.getCursorTracking();
    a.drawAtScreenPosition(100, 200);
    a.drawAtScreenPosition();
    const rect: SparkleCanvasRect | null = a.getCanvasRect();
    if (rect) a.drawAtCanvasPosition(rect.left, rect.top);
    a.drawAtCanvasPosition();
    a.pause();
    a.resume();
    a.setScale(2);
    a.setOutOfViewRendering(false);

    const shape: SparkleShape = { rotate: true, stretch: false, speed: 1, weight: 1, avoidEdges: true, points: [{ x: 0, y: 0 }] };
    a.setDemoShapesDrawing(true, [shape], 2);
    a.setDemoShapesDrawing(false);

    const { 'about': about, 'version': version, 'image-data': imageData, ...input } = SparkleMouse.defaultSparkle;
    const settingsInput: SparkleSettingsInput = input;
    const created: SparkleSettings = await SparkleMouse.createSparkleSettings(['a.png', new Image()], settingsInput, false, { readFile: async () => new Uint8Array() });
    const parsed: SparkleSettings = SparkleMouse.parseSparkleFile('{}');

    const started: boolean = a.isStarted;
    const paused: boolean = a.isPaused;
    const element: HTMLCanvasElement = a.getCanvas();
    await a.stop();
    await a.destroy();

    return [tracking, about, version, imageData, created, parsed, started, paused, element];
}



// invalid usage, each line must fail to type check
async function invalid(a: SparkleMouse, input: SparkleSettingsInput) {
    // @ts-expect-error unknown mouse-state
    await a.start({ ...SparkleMouse.defaultSparkle, 'mouse-state': 'hover' });
    // @ts-expect-error missing settings
    await a.start({ 'amount': 1 });
    // @ts-expect-error number instead of settings
    await a.start(42);
    // @ts-expect-error x without y
    a.drawAtScreenPosition(1);
    // @ts-expect-error readonly
    a.isStarted = true;
    // @ts-expect-error image-data is generated
    await SparkleMouse.createSparkleSettings([], { ...input, 'image-data': 'x' });
    // @ts-expect-error required setting missing
    await SparkleMouse.createSparkleSettings([], { 'amount': 1 });
    // @ts-expect-error shape needs points
    a.setDemoShapesDrawing(true, [{ rotate: true, stretch: false, speed: 1, weight: 1, avoidEdges: true }]);
}



export { valid, invalid };
