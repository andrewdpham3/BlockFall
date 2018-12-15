var proj2 = {};

proj2 = function() {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Common = Matter.Common,
        World = Matter.World,
        Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
    world = engine.world;
    engine.world.gravity.y = 200; //high gravity for more bounces
    engine.timing.timeScale = 0.01; //slow time so that we can see it

    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 800,
            height: 600,
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add walls
    World.add(world, [
        Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
        Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
        Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
        Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    ]);
  
    // add randomly sized circles
    World.add(world, Composites.stack(20, 100, 15, 3, 20, 40, function(x, y) { //load them into a stack then add to world
        return Bodies.circle(x, y, Common.random(10,20), {restitution : 1}); //restitution gives us no kinetic energy loss but gravity will eventually stop it
    }));

    // add randomly sized rectangles
    World.add(world, Composites.stack(50, 50, 8, 3, 0, 0, function(x, y) {
        return Bodies.rectangle(x, y, Common.random(10,20), Common.random(10,20), {restitution : 1});
    }));

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });

    // context for MatterTools
    return {
        render: render
    }
};

// run and test our scene
MatterTools.Demo.create({examples: [{init: proj2}]});