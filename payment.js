window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const institutionName = urlParams.get('institution');
    const donationValue = urlParams.get('value');
  
    document.querySelector('.ong-name').textContent = institutionName;
    document.querySelector('.donation-value').textContent = donationValue;
  };

  document.querySelector('.done-btn').addEventListener('click', function() {
    window.location.href = 'home.html';
  });