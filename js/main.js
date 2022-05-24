const burger = document.getElementById('burger')
const presentBtn = document.getElementById('presentPlay')
const headerMenu = document.getElementById('rightMenu')

const data = {
  currentSlide: 0,
  statePresentaion: false,
  vapes: [
    { 
      id: 0,
      image: '../assets/images/vapes/1.png',
      color: '#9900574d'
    },
    { 
      id: 1,
      image: '../assets/images/vapes/2.png',
      color: '#009B10'
    },
    { 
      id: 2,
      image: '../assets/images/vapes/1.png',
      color: 'orange'
    },
    { 
      id: 3,
      image: '../assets/images/vapes/2.png',
      color: 'red'
    },
    { 
      id: 4,
      image: '../assets/images/vapes/1.png',
      color: 'yellow'
    },
    { 
      id: 5,
      image: '../assets/images/vapes/2.png',
      color: 'brown'
    },
  ]
}

burger.addEventListener('click', (event) => {
  if (!burger.classList.contains('open')) {
    burger.classList.add('open')
    headerMenu.style.transform = 'translateX(00%)'
  }
  else {
    burger.classList.remove('open')
    headerMenu.style.transform = 'translateX(100%)'
  }
  console.log(event)
  console.log(burger)
})

initSlider('.slider', '.slider-pagination')

function initSlider(sliderSelector, sliderPagination) {
  const slider = document.querySelector(sliderSelector)
  const sliderLength = data.vapes.length

  const mainBackground = document.querySelector('.main-background')
  const mainLighing = document.querySelector('.main-lighting')

  const pagination = document.querySelector(sliderPagination)
  const paginationPrev = pagination.querySelector("div[data-pagination='prev']")
  const paginationNext = pagination.querySelector("div[data-pagination='next']")

  const navigation = document.querySelector('.slider-nav')
  
  paginationNext.addEventListener('click', moveSliderNext)
  paginationPrev.addEventListener('click', moveSliderPrev)
  

  presentBtn.addEventListener('click', startPresent)
  createSlider();
  function startPresent() {
    if ( !data.statePresentaion ) {
      presentBtn.classList.add('footer-present--active')
      data.statePresentaion = true
      var presentation = setInterval(() => {
        data.presentaion = presentation
        if ( !(data.currentSlide >= sliderLength -1) ) {
          data.currentSlide++
        }
        else {
          data.currentSlide = 0
          stopPresent()
        }
        moveSlider()
        
      }, 2000)  
    }
    else {
      stopPresent()
    }

    function stopPresent() {
      presentBtn.classList.remove('footer-present--active')
      clearInterval(data.presentaion)
      data.statePresentaion = false
    }
    
  }
  function checkIndexNavigation() {
    let navElements = navigation.querySelectorAll('.slider-nav__bullet')
    navElements.forEach((item,index) => {
      if ( data.currentSlide === index ) {
        item.classList.add('slider-nav__bullet--active')
      }
      else if ( item.classList.contains('slider-nav__bullet--active') ){
        item.classList.remove('slider-nav__bullet--active')
      }
    })
    
  }
  function checkIndexPagination() {
    if ( data.currentSlide === 0 ) {
      paginationPrev.classList.add('slider-pagination--disable')
    }
    else {
      if (paginationPrev.classList.contains('slider-pagination--disable')) {
        paginationPrev.classList.remove('slider-pagination--disable')
      }
    }

    if ( data.currentSlide === sliderLength -1 ) {
      paginationNext.classList.add('slider-pagination--disable')
    }
    else {
      if (paginationNext.classList.contains('slider-pagination--disable')) {
        paginationNext.classList.remove('slider-pagination--disable')
      }
    }
  }
  function initNavigation() {
    data.vapes.forEach((item) => {
      let navTemplate = `
      <div data-index="${item.id}" class="footer-nav__bullet slider-nav__bullet">
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="4" cy="4" r="4" fill="currentColor"/>
        </svg> 
      </div>
      `
      navigation.insertAdjacentHTML('beforeEnd', navTemplate);
    })

    const navElements = navigation.childNodes
    navElements.forEach((item, index) => {
      item.addEventListener('click', (event) => {
        data.currentSlide = +item.dataset.index
        moveSlider()
      })
    })
    
  }
  function changeMainLighting() {
    let currentSlide = data.vapes.find(item => item.id === data.currentSlide)
    mainBackground.style.setProperty("filter", `drop-shadow( 0px 0px 120px ${currentSlide.color})`)
    mainLighing.style.color = currentSlide.color
  }
  function moveSliderPrev() {
    if ( !(data.currentSlide <= 0)) {
      data.currentSlide--
      moveSlider()
    }
    else {
      data.currentSlide = 0
      moveSlider()
    }
  }
  function moveSliderNext() {
    if ( !(data.currentSlide >= sliderLength -1) ) {
      data.currentSlide++
      moveSlider()
    }
    else {
      data.currentSlide = 0
      moveSlider()
    }
  }
  function moveSlider() {
    slider.style.transform = `translateX(${data.currentSlide * -100}vw)`;
    changeMainLighting()
    checkIndexNavigation()
    checkIndexPagination()
  }
  function createSlider() {
    data.vapes.forEach((item) => {
      let slideTemplate = `
      <div data-index="${item.id}" class="slider__item main-content__image">
        <img src="../${item.image}" alt="">
      </div>
      `
      slider.insertAdjacentHTML('beforeEnd', slideTemplate);
    })
    initNavigation()
    moveSlider()
  }
  
}
