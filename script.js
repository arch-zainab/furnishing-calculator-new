
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

    // مكيفات
    const ac12 = parseInt(document.getElementById('ac12').value || 0);
    const ac18 = parseInt(document.getElementById('ac18').value || 0);
    total += ac12 * 700 + ac18 * 875;

    // أجهزة كهربائية (نعم / لا)
    if (document.getElementById('fridge').value === 'نعم') total += 750;
    if (document.getElementById('washer').value === 'نعم') total += 500;
    if (document.getElementById('oven').value === 'نعم') total += 450;
    if (document.getElementById('dishwasher').value === 'نعم') total += 475;
    if (document.getElementById('tv').value === 'نعم') total += 750;

    // عرض الناتج
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

  // إعداد بيانات الاشتراك
  const data = {
    email: email,
    fields: {
      name: name
    }
  };

  // إرسال البيانات إلى MailerLite
  fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZDgzOTRhMjg1YmM0MGUzMjE3ODFmZGQ2ZjlmNzE1MGM5NTBkYTNhNmZjZDVjNDJiNTIwZTkzMWU4YTgzZTVlNjEyZjlhNWJmMDBlOTI4ZDkiLCJpYXQiOjE3NDk5NzgyNjkuNDk0NzIzLCJuYmYiOjE3NDk5NzgyNjkuNDk0NzI1LCJleHAiOjQ5MDU2NTE4NjkuNDkwNzYsInN1YiI6IjE2MDk0NzEiLCJzY29wZXMiOltdfQ.lTRIBP9n_VWS7TkwcQG5Io5fIjzKOd0xyK1b8aGx4w_fsmTmjyOdR1QKmyWJCH_njylpMst1k4UiLIhvwQU6AQEvodME6lqnH7toFrLReDtpVxt2vBfoiuX6EyNXEuLL4U4aBxg-4OqQGNwyIekyal8SecV4_MC5LZbQJXxsInpPS9o9tIVe8S2_O44UelxfSo23-Dftpg1D65KkBNrPJRB-d_YTz_VCcl4dv5uiDAjT6JsZXN8kx1oeQVrMQJb9RDJ1BUoIZeu07OnnovAiP5LSCZsxiMY6n1_Wfh4L9CVZug_VgFOQeIbilKE7prtMwTrjxojE_xoXmYBTqF4IA9j7TAKGUfLaOxrSoruIv0rg0rjYnw0PUgNTik60F_JIYCOl_d5RndyBG8_QnatdC5kwZeNbM5qf-62L9plvfb2CKhX0n8Jvx-3xoaqTtAqBpo9O8IHL2B6__j3ax9ictQlaJK0T-IvrQisbntIfvdZNoqoitiWfNIxA9xXfogRs33t8BhSfdg2zmqFXnQJRW-6VolUjFG8ECbFwH3geQYjojIe6o4jeAZQ5HQDRyVMbuSWVROx5qKJvVwMysR0uK-PwTnqZvYws1Q5awHp9ps-xKDySV3biH1b4JSIlvjJPFmr5A1UhRM3O24_Une6DNNOIA889PwbQm_DzkK-cHzA"
    },
    body: JSON.stringify({
      email: email,
      fields: { name: name },
      groups: [157262493322839310] // ID مجموعة Budget Form Subscribers
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
