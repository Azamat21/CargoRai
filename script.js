async function trackPackage() {
    const trackingNumber = document.getElementById('trackingNumber').value;
    const apiKey = 'asat_ebdfaea4565d47b49facb27254cedad7';  // Сюда нужно вставить твой API ключ
    const url = `https://api.aftership.com/v4/trackings?tracking_number=${trackingNumber}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayResult(data);
    } catch (error) {
        document.getElementById('result').innerHTML = 'Ошибка при отслеживании посылки';
    }
}

function displayResult(data) {
    // Отображение информации о посылке
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = JSON.stringify(data);
}
