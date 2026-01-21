document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#bmi-form');
    const heightInput = document.querySelector('#height');
    const weightInput = document.querySelector('#weight');
    const resultsContainer = document.querySelector('#results');
    const bmiNumber = document.querySelector('#bmi-number');
    const bmiStatus = document.querySelector('#bmi-status');
    const bmiMessage = document.querySelector('#bmi-message');
    const resetBtn = document.querySelector('#reset-btn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);

        if (validateInputs(height, weight)) {
            const bmi = calculateBMI(height, weight);
            displayResults(bmi);
        }
    });

    resetBtn.addEventListener('click', () => {
        resultsContainer.classList.add('hidden');
        resetStatusClasses();
    });

    function validateInputs(height, weight) {
        if (isNaN(height) || height <= 0 || height > 300) {
            alert('Please enter a valid height (0-300 cm)');
            return false;
        }
        if (isNaN(weight) || weight <= 0 || weight > 500) {
            alert('Please enter a valid weight (0-500 kg)');
            return false;
        }
        return true;
    }

    function calculateBMI(height, weight) {
        // Height in cm, weight in kg
        // Formula: weight(kg) / [height(m)]^2
        const heightInMeters = height / 100;
        return (weight / (heightInMeters * heightInMeters)).toFixed(1);
    }

    function displayResults(bmi) {
        bmiNumber.textContent = bmi;
        resultsContainer.classList.remove('hidden');
        
        const category = getBMICategory(bmi);
        updateStatusUI(category);
    }

    function getBMICategory(bmi) {
        if (bmi < 18.5) return 'underweight';
        if (bmi >= 18.5 && bmi <= 24.9) return 'normal';
        if (bmi >= 25 && bmi <= 29.9) return 'overweight';
        return 'obese';
    }

    function updateStatusUI(category) {
        resetStatusClasses();
        
        let statusText = '';
        let messageText = '';
        let statusClass = '';

        switch (category) {
            case 'underweight':
                statusText = 'Underweight';
                messageText = 'You may need to focus on nutritional intake and a balanced diet. Consider consulting a professional.';
                statusClass = 'status-underweight';
                break;
            case 'normal':
                statusText = 'Normal Weight';
                messageText = 'You have a healthy body weight! Keep maintaining your balanced lifestyle and activity.';
                statusClass = 'status-normal';
                break;
            case 'overweight':
                statusText = 'Overweight';
                messageText = 'Consider adding more physical activity to your routine and monitoring your portion sizes.';
                statusClass = 'status-overweight';
                break;
            case 'obese':
                statusText = 'Obese';
                messageText = 'It is recommended to speak with a healthcare provider about strategies for long-term health management.';
                statusClass = 'status-obese';
                break;
        }

        bmiStatus.textContent = statusText;
        bmiMessage.textContent = messageText;
        bmiStatus.classList.add(statusClass);
    }

    function resetStatusClasses() {
        bmiStatus.classList.remove('status-underweight', 'status-normal', 'status-overweight', 'status-obese');
    }
});
