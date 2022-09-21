var NUM_PARTICLES = ( ( ROWS = 80 ) * ( COLS = 80 ) ),
    // Thickness of cursor bubble
    THICKNESS = Math.pow(40, 2),
    // Spacing between dots
    SPACING = 10,
    MARGIN = 0,
    // Color of Dots
    COLOR = 0,
    // Trail for cursor
    DRAG = 0.9,
    // How dots go back into place
    EASE = 0.4,
    
    /*
    
    used for sine approximation, but Math.sin in Chrome is still fast enough :)http://jsperf.com/math-sin-vs-sine-approximation

    B = 4 / Math.PI,
    C = -4 / Math.pow( Math.PI, 2 ),
    P = 0.225,

    */

    container,
    particle,
    canvas,
    mouse,
    stats,
    list,
    ctx,
    tog,
    man,
    dx, dy,
    mx, my,
    d, t, f,
    a, b,
    i, n,
    w, h,
    p, s,
    r, c
    ;

particle = {
  vx: 0,
  vy: 0,
  x: 0,
  y: 0
};

var dark = false;

function init() {

  container = document.getElementById( 'container' );
  canvas = document.createElement('canvas');
  document.getElementById("menu").style.display = 'none';
  
  ctx = canvas.getContext( '2d' );
  man = true;
  tog = false;
  
  list = [];
  
  w = canvas.width = COLS * SPACING + MARGIN * 2;
  h = canvas.height = ROWS * SPACING + MARGIN * 2;
  
  for ( i = 0; i < NUM_PARTICLES; i++ ) {
    
    p = Object.create( particle );
    p.x = p.ox = MARGIN + SPACING * ( i % COLS );
    p.y = p.oy = MARGIN + SPACING * Math.floor( i / COLS );
    
    list[i] = p;
  }

  container.addEventListener( 'mousemove', function(e) {

    bounds = container.getBoundingClientRect();
    mx = e.clientX - bounds.left;
    my = e.clientY - bounds.top;
    man = true;
    
  });
  
  if ( typeof Stats === 'function' ) {
    document.body.appendChild( ( stats = new Stats() ).domElement );
  }
  
  container.appendChild( canvas );
}

function step() {

  if ( stats ) stats.begin();

  if ( tog = !tog ) {

    if ( !man ) {

      t = +new Date() * 0.001;
      mx = w * 0.5 + ( Math.cos( t * 2.1 ) * Math.cos( t * 0.9 ) * w * 0.45 );
      my = h * 0.5 + ( Math.sin( t * 3.2 ) * Math.tan( Math.sin( t * 0.8 ) ) * h * 0.45 );
    }
      
    for ( i = 0; i < NUM_PARTICLES; i++ ) {
      
      p = list[i];
      
      d = ( dx = mx - p.x ) * dx + ( dy = my - p.y ) * dy;
      f = -THICKNESS / d;

      if ( d < THICKNESS ) {
        t = Math.atan2( dy , dx );
        p.vx += f * Math.cos(t);
        p.vy += f * Math.sin(t);
      }

      p.x += ( p.vx *= DRAG ) + (p.ox - p.x) * EASE;
      p.y += ( p.vy *= DRAG ) + (p.oy - p.y) * EASE;

    }

  } else {

    b = ( a = ctx.createImageData( w, h ) ).data;

    for ( i = 0; i < NUM_PARTICLES; i++ ) {

      p = list[i];
      b[n = ( ~~p.x + ( ~~p.y * w ) ) * 4] = b[n+1] = b[n+2] = COLOR, b[n+3] = 255;
    }

    ctx.putImageData( a, 0, 0 );
  }

  if ( stats ) stats.end();

  requestAnimationFrame( step );
}

/**
 * Function that controls Dark Mode and Colors
 */
function darkMode()
{
  if (!dark)
  {
    document.body.style.background = "black";
    document.getElementById("text").style.color = "white";
    document.getElementById("text-heading").style.color = "white";
    document.getElementById("menu").style.color = "white";
    document.getElementsByClassName("hamburger__inner")[0].style.backgroundColor = "white";
    document.getElementsByClassName("hamburger__inner")[0].classList.toggle("dark");
    
    // Color of Dots
    COLOR = 1000;

    // Set bool
    dark = true;
  }
  else
  {
    document.body.style.backgroundColor = "white";
    document.getElementById("text").style.color = "black";
    document.getElementById("text-heading").style.color = "black";
    document.getElementById("menu").style.color = "black";
    document.getElementsByClassName("hamburger__inner")[0].style.backgroundColor = "black";
    document.getElementsByClassName("hamburger__inner")[0].classList.toggle("dark");
    
    // Color of Dots
    COLOR = 0;

    // Set bool
    dark = false;
  }
}

function ham_menu() {
  var x = document.getElementById("menu");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

document.querySelector('.hamburger').addEventListener('click', (e) => {
  e.currentTarget.classList.toggle('is-active');
})

init();
step();