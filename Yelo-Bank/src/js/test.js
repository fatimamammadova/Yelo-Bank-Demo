
fetch('http://localhost:3000/NEWS')
.then(res => res.json())
.then(data => {
    for(let el in data) {
        data[el].date = convertToISOFormat(data[el].date)
        console.log(data[el].date,data[el].id)
    }
})
function convertToISOFormat(dateString) {
    const monthMap = {
        'Yanvar': 0, 'Fevral': 1, 'Mart': 2, 'Aprel': 3,
        'May': 4, 'İyun': 5, 'İyul': 6, 'Avqust': 7,
        'Sentyabr': 8, 'Oktyabr': 9, 'Noyabr': 10, 'Dekabr': 11
    };
    const parts = dateString.split(' ');
    const day = parseInt(parts[0], 10);
    const month = monthMap[parts[1]];

    // Validate month value
    if (isNaN(month) || month < 0 || month > 11) {
        throw new Error('Invalid month value in the API response');
    }

    const year = parseInt(parts[2], 10);
    const dateObject = new Date(year, month, day);

    // Check if the dateObject is a valid Date
    if (isNaN(dateObject.getTime())) {
        throw new Error('Invalid date');
    }

    const isoFormat = dateObject.toISOString();

    return isoFormat;
}
