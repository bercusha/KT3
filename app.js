const sliderContainer = document.querySelector('.slider-container');
const sliderTrack = document.querySelector('.slider-track');
const sliderRange = document.querySelector('.slider-range');
const sliderThumb = document.querySelector('.slider-thumb');
const sliderValue = document.querySelector('.slider-value');

const min = 0;
const max = 100;
let value = 50;

sliderThumb.style.left = `${((value - min) / (max - min)) * 100}%`;
sliderRange.style.width = `${((value - min) / (max - min)) * 100}%`;
sliderValue.innerText = value;

const updateValue = (newValue) => {
  value = newValue;
  sliderThumb.style.left = `${((value - min) / (max - min)) * 100}%`;
  sliderRange.style.width = `${((value - min) / (max - min)) * 100}%`;
  sliderValue.innerText = value;
};

const onMouseDown = (event) => {
  event.preventDefault();

  const onMouseMove = (event) => {
    const { left: containerLeft, width: containerWidth } =
      sliderContainer.getBoundingClientRect();
    const { clientX } = event;

    let newValue = ((clientX - containerLeft) / containerWidth) * (max - min) + min;
    newValue = Math.max(min, Math.min(max, Math.round(newValue)));
    updateValue(newValue);
  };

  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

sliderThumb.addEventListener('mousedown', onMouseDown);
