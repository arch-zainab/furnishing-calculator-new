
document.getElementById('ownsProperty').addEventListener('change', function () {
    const cityField = document.getElementById('cityField');
    cityField.style.display = this.value === 'نعم' ? 'block' : 'none';
});

document.getElementById('userInfoForm').addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('page1').style.display = 'none';
    document.getElementById('page2').style.display = 'block';
});

document.getElementById('calcButton').addEventListener('click', function () {
    const area = parseFloat(document.getElementById('area').value);
    const level = parseFloat(document.querySelector('input[name="level"]:checked')?.value || 0);

    let total = 0;

    if (area && level) total += area * level;

    const ac12 = parseInt(document.getElementById('ac12').value || 0);
    const ac18 = parseInt(document.getElementById('ac18').value || 0);
    total += ac12 * 700 + ac18 * 875;

    if (document.getElementById('fridge').value === 'نعم') total += 750;
    if (document.getElementById('washer').value === 'نعم') total += 500;
    if (document.getElementById('oven').value === 'نعم') total += 450;
    if (document.getElementById('dishwasher').value === 'نعم') total += 475;
    if (document.getElementById('tv').value === 'نعم') total += 750;

    document.getElementById('totalCost').innerText = `💰 التكلفة التقديرية: ${total.toLocaleString()} دولار`;
});

document.getElementById("budget-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  if (!name || !email) {
    alert("يرجى إدخال الاسم والبريد الإلكتروني.");
    return;
  }

  fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer <YOUR_API_TOKEN_HERE>"
    },
    body: JSON.stringify({
      email: email,
      fields: { name: name },
      groups: [157262493322839310]
    })
  })
    .then(response => {
      if (response.ok) {
        alert("تم الاشتراك بنجاح! ستصلك الرسائل قريباً 💌");
        document.getElementById("budget-form").reset();
      } else {
        alert("حدث خطأ أثناء الاشتراك. يرجى المحاولة مرة أخرى.");
      }
    })
    .catch(error => {
      console.error("Subscription error:", error);
      alert("فشل الاتصال. تأكد من اتصالك بالإنترنت.");
    });
});
