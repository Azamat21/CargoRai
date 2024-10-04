document.getElementById('trackingForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const trackingNumber = document.getElementById('trackingNumber').value;

    // Сохраняем имя и телефон в localStorage (или база данных на сервере)
    localStorage.setItem('userName', name);
    localStorage.setItem('userPhone', phone);

    // Делаем запрос к AfterShip API
    const apiKey = 'YOUR_API_KEY'; // Вставь сюда свой API ключ AfterShip
    const url = `https://api.aftership.com/v4/trackings?tracking_number=${trackingNumber}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'aftership-api-key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error('Ошибка при запросе данных');
        }

        const data = await response.json();
        displayResult(data);

    } catch (error) {
        document.getElementById('result').innerHTML = 'Ошибка при отслеживании посылки';
    }
});

function displayResult(data) {
    const resultDiv = document.getElementById('result');
    if (data && data.data && data.data.trackings.length > 0) {
        const trackingInfo = data.data.trackings[0];
        resultDiv.innerHTML = `
            <h3>Результаты отслеживания:</h3>
            <p>Статус: ${trackingInfo.tag}</p>
            <p>Текущее местоположение: ${trackingInfo.location || 'Недоступно'}</p>
            <p>Последнее обновление: ${trackingInfo.checkpoints ? trackingInfo.checkpoints.slice(-1)[0].message : 'Нет данных'}</p>
        `;
    } else {
        resultDiv.innerHTML = 'Информация о посылке не найдена.';
    }
}
