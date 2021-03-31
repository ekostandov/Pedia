const fillForm = function () {
  const form = document.getElementById('form');
  const steps = document.querySelectorAll('.step');
  let curStep = 0;
  let stepInputs = Array.from(
    steps[curStep].querySelectorAll('.form-option input')
  );
  const props = Array.from(document.querySelectorAll('.props__type'));
  const btnNext = document.querySelector('#btn-next');
  const btnBack = document.querySelector('#btn-back');
  const maxStep = steps.length;

  // Move to PREV or NEXT form STEP/TAB
  const goToStep = function (step) {
    steps.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - step)}%)`)
    );
  };

  const nextStep = function () {
    // 1. Adds current step value to sidebar properties
    updateProperties(curStep);
    // 2. Encreases step by 1
    curStep++;

    if (curStep < maxStep - 1) {
      // 3. Update list of inputs elements
      stepInputs = Array.from(
        steps[curStep].querySelectorAll('.form-option input')
      );
      // 4. Fill prop dot with active color
      activateStep();
      // 5. Check if current step fields are empty
      checkInputs();
      // 6. Add listeners in case step fields will be filled
      stepListener(curStep);
    }

    if (curStep === maxStep - 1) {
      btnBack.style.display = 'none';
      btnNext.style.width = '253px';
      btnNext.setAttribute('type', 'submit');
      btnNext.textContent = 'I want more accurate price';
      btnNext.removeAttribute('disabled', 'disabled');
    }
    // 6. Go to choosen step
    goToStep(curStep);
  };

  const prevStep = function () {
    curStep--;
    stepInputs = Array.from(
      steps[curStep].querySelectorAll('.form-option input')
    );
    goToStep(curStep);
    checkInputs(curStep);
  };

  // Prevent form submit not on last steps
  const submitValidation = function (e) {
    if (curStep < maxStep) {
      e.preventDefault();
      return false;
    }
  };

  // Run after click on BACK or NEXT buttons
  // Checks if inputs filled. Calls updateButtons fn to update buttons state.
  const checkInputs = function () {
    let isInputsNotFilled = true;
    if (stepInputs[0].type === 'text') {
      isInputsNotFilled = stepInputs.some((inp) => inp.value === '');
    }
    if (stepInputs[0].type === 'radio') {
      isInputsNotFilled = stepInputs.every((inp) => !inp.checked);
    }
    updateButtons(curStep, isInputsNotFilled);
  };

  // Adds inputs event listeners to new step
  const stepListener = function () {
    if (stepInputs[0].type === 'text') {
      stepInputs[0].addEventListener('change', function () {
        if (stepInputs[0].value !== '') {
          btnNext.removeAttribute('disabled', 'disabled');
          btnNext.classList.add('btn_primary');
        }
      });
    }

    if (stepInputs[0].type === 'radio') {
      for (let input of stepInputs) {
        input.addEventListener('click', function () {
          btnNext.removeAttribute('disabled', 'disabled');
          btnNext.classList.add('btn_primary');
        });
      }
    }
  };

  // Updates buttons state
  const updateButtons = function (step, isInputsNotFilled) {
    if (isInputsNotFilled) {
      btnNext.setAttribute('disabled', 'disabled');
      btnNext.classList.remove('btn_primary');
    } else {
      btnNext.removeAttribute('disabled', 'disabled');
      btnNext.classList.add('btn_primary');
    }

    if (step === 0) {
      btnBack.setAttribute('disabled', 'disabled');
      btnBack.classList.remove('btn_secondary');
    } else {
      btnBack.removeAttribute('disabled', 'disabled');
      btnBack.classList.add('btn_secondary');
    }
  };

  // SIDEBAR
  // Fills prop dot with active color
  const activateStep = function () {
    props[curStep + 1].classList.remove('props__type_filled');
    props[curStep + 1].classList.add('props__type_filled');
  };

  // Updates props on sidebar
  const updateProperties = function () {
    const stepName = stepInputs[0].getAttribute('name');
    const prop = document.querySelector(`.props__value_${stepName}`);

    if (stepInputs[0].type === 'text') {
      const stepValue = stepInputs[0].value;
      prop.textContent = stepValue;
    }

    if (stepInputs[0].type === 'radio') {
      const radioInputs = document.getElementsByName(stepName);
      for (let radio of radioInputs) {
        if (radio.checked) {
          prop.textContent = radio.nextElementSibling.textContent;
        }
      }
    }

    prop.classList.remove('props__value_filled');
    prop.classList.add('props__value_filled');
  };

  const stepsInit = function () {
    activateStep();
    goToStep(curStep);
    stepListener(curStep);
    checkInputs();
  };

  stepsInit();

  btnNext.addEventListener('click', nextStep);
  btnBack.addEventListener('click', prevStep);
  form.addEventListener('submit', submitValidation);
};
fillForm();

// Navigation
const nav = document.querySelector('.nav');
const btnNav = document.querySelector('.nav__button');
const coverNav = document.querySelector('.nav__cover');

btnNav.addEventListener('click', function () {
  nav.classList.toggle('active');
  btnNav.classList.toggle('active');
  coverNav.classList.toggle('active');
});

coverNav.addEventListener('click', function () {
  nav.classList.toggle('active');
  btnNav.classList.toggle('active');
  coverNav.classList.toggle('active');
});
