// Slides array

let slides = [
  {
    id: 1,
    image: "https://i.imgur.com/S2UQirM.jpg",
    url: "http://google.com"
  },
  {
    id: 2,
    image: "https://wallpapercave.com/wp/Wtuzj6Y.jpg",
    url: "http://google.com"
  },
  {
    id: 3,
    image: "https://wallpapercave.com/wp/fOJ57nU.jpg",
    url: "http://google.com"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1569190867324-baed792e0a90?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    url: "http://google.com"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1569096874943-976814bb4aec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjExMDk0fQ&auto=format&fit=crop&w=1350&q=80",
    url: "http://google.com"
  },
];


// Create slider elements
let slider = document.createElement('div');
let navigationLeft = document.createElement('button');
let navigationRight = document.createElement('button');
let sliderItems = document.createElement('div');
let sliderWrapper = document.createElement('div');
let buttonWrapper = document.createElement('div');
let navWrapper = document.createElement('div');

navigationLeft.innerHTML = 'Left';
navigationRight.innerHTML = 'Right';


// Add ID and classes to elements
navigationLeft.classList.add('navigation', 'navigation-left');
navigationRight.classList.add('navigation', 'navigation-right');
sliderItems.id = 'sliderItems';
sliderItems.id = 'sliderItems';
sliderWrapper.id = 'sliderWrapper';
buttonWrapper.id = 'buttonWrapper';
navWrapper.id = 'navWrapper';

// Dinamically change sliderWrapper's width
sliderWrapper.style.width = 1000 * slides.length + 'px';

// Create navigation bubbles
for (i = 0; i < slides.length; i++){
  let bubble = document.createElement('div');
  bubble.id = 'nav' + i;
  bubble.style.width = '7px';
  bubble.style.height = '7px';
  bubble.style.borderRadius = '10px';
  bubble.style.backgroundColor = 'gray';
  bubble.style.float = 'left';
  bubble.style.margin = '3px';
  bubble.style.display = 'inline-block';
  navWrapper.appendChild(bubble);
}

// Loop to create slides and append them into sliderWrapper
for (i = 0; i < slides.length; i++) {
  let slide = document.createElement('a');
  slide.id = slides[i].id;
  slide.classList.add('slide');
  slide.setAttribute('href', slides[i].url);
  slide.style.background = "url('" + slides[i].image + "')";
  slide.style.backgroundSize = '1000px 100%'
  sliderWrapper.appendChild(slide);
}


// Attach slider to body
sliderItems.appendChild(navWrapper);
sliderItems.appendChild(sliderWrapper);
buttonWrapper.appendChild(navigationLeft);
buttonWrapper.appendChild(navigationRight);
slider.appendChild(buttonWrapper);
slider.appendChild(sliderItems);
document.body.appendChild(slider);

// Buttons and nav bubbles functionality
let currentSlide = 1;
let activeBubbleColor = 'Cyan';
let activeBubble = document.getElementById(`nav${currentSlide - 1}`).style.backgroundColor = activeBubbleColor;


document.querySelectorAll(".navigation").forEach(item => {
  item.addEventListener("click", event => {
    if (event.target.classList.contains("navigation-left")) {
      if (currentSlide === 1) {
        document.getElementById(`nav${currentSlide - 1}`).style.backgroundColor = 'Grey';
        currentSlide = slides.length;
        activeBubble = document.getElementById(`nav${currentSlide - 1}`).style.backgroundColor = activeBubbleColor;
      } else {
        document.getElementById(`nav${currentSlide - 1}`).style.backgroundColor = 'Grey';
        currentSlide = currentSlide - 1;
        activeBubble = document.getElementById(`nav${currentSlide - 1}`).style.backgroundColor = activeBubbleColor;
      }
    } else {
      if (currentSlide >= slides.length) {
        document.getElementById(`nav${currentSlide - 1}`).style.backgroundColor = 'Grey';
        currentSlide = 1;
        activeBubble = document.getElementById(`nav${currentSlide - 1}`).style.backgroundColor = activeBubbleColor;
      } else {
        document.getElementById(`nav${currentSlide - 1}`).style.backgroundColor = 'Grey';
        currentSlide = currentSlide + 1;
        activeBubble = document.getElementById(`nav${currentSlide - 1}`).style.backgroundColor = activeBubbleColor;
      }
    }
    let left = (currentSlide - 1) * 1000;
    document.getElementById("sliderWrapper").style.left = "-" + left + "px";
  });
});
