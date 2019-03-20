const damp = 0.1;
let playing = false;
let ctx;
let osc1;
let osc2;
let gn;

document.addEventListener("click", e => {
    playing = !playing;

    if (playing) {
        ctx = new AudioContext();
        osc1 = ctx.createOscillator();
        osc1.type = 'sine';
        gn1 = ctx.createGain();
        osc1.connect(gn1);
        gn1.connect(ctx.destination);
        
        osc2 = ctx.createOscillator();
        osc2.type = 'square';
        gn2 = ctx.createGain();
        osc2.connect(gn2);
        gn2.connect(ctx.destination);

        gn2.gain.value = 0;
        gn1.gain.value = 0;


        osc1.start();
        osc2.start();
    } else {
        osc1.stop();
        osc2.stop();
    }
});

document.addEventListener("mousemove", e => {
    console.log(e);

    let freq = 940 -( (e.clientY / window.innerHeight) * 840 );
    let vol = Math.sqrt(e.clientX/window.innerWidth);
    if (ctx) {
        
        gn1.gain.value = (vol) * damp;
        gn2.gain.value = (1-vol) * damp;
        osc1.frequency.setValueAtTime(freq, ctx.currentTime);
        osc2.frequency.setValueAtTime(freq, ctx.currentTime);
    }
});
