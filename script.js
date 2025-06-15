document.getElementById('ownsProperty').addEventListener('change', function () {
    const cityField = document.getElementById('cityField');
    cityField.style.display = this.value === 'نعم' ? 'block' : 'none';
});

document.getElementById('userInfoForm').addEventListener('submit', function (e) {
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
            "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiNzZiMDgxYTczNzljZmExMzVhZDRlMGY3ODllMDQ0MGUzNDA2NTIxN2MzMDc3ZmFiMDliNjA3MmFmNjE2ZTYxYzM4NWZlZWEyZWM0ZjhmYTgiLCJpYXQiOjE3NDk5OTExNTYuOTI0NzI2LCJuYmYiOjE3NDk5OTExNTYuOTI0NzI4LCJleHAiOjQ5MDU2NjQ3NTYuOTIxNDU5LCJzdWIiOiIxNjA5NDcxIiwic2NvcGVzIjpbXX0.Kg_lkNXw7USKG7ePQjjHaSkD79_czG56-6M6TS37xmoBwTOERoLPdugak72eZDb7vcxjH1hNZ0djrA9p5baSpj7HQHG4gzFvjFnjUf9K8WwLO3xQ1FJN8f_df-XjlPB9gqPXasvUznS-qZu05B8Vp6ro_uOFEgmh_uvrEOGKmm-lbQxE-7hWV8-NFRj_4J1kWU0jbZbGUteIte6jtkdXfytUYhfG5QskuSuw9WJS3K-l-_aHjY2nHJQIwrCw0zGMFnuPekvO5XUcwLmDUWRL6tbopy_aVfW_XN4KW8nzbownyFkqGAUYi_sdN0HGoi9Q-8aqdXCJLxl1-Mel-VESNovFuswxHJUEUrDv15yB0J10TVf2WLh4CD_mL63nU1RQsPBJ9pmT-t3CKPNJ6yztg_1inCS-E0PUvI38sotdCjwHJA3j0o_b3XA4h6DTG2XaDhUNPj1xlh5P1AYo4XJpQ5QPUvpOG4XGKCjU12rjFUM07jP6wcisMTXwpW1xEVxPj8zeR3ULiM_UxO4UAPEmjmhMECiGw-hC-LCsgSS9a-LEAPYuHQh04YttBYFcf8LS7zu0a3R89X1AD68dZFUlus1kIOZ1ItFI7hWi-J6aRvRSoCe6GYzOefT92SQ3jP_d6kgvRMwwcmso5PkHg8B47ix_KRCQ45tEndIvIc3mVPA"
        },
        body: JSON.stringify({
            email: email,
            fields: { name: name },
            groups: [157262493322839310]
        })
    })
    .then(response => {
        if (response.ok) {
            alert("تم الاشتراك بنجاح! ✅ ستصلك الرسائل خلال لحظات.");
            document.getElementById('page1').style.display = 'none';
            document.getElementById('page2').style.display = 'block';
        } else {
            alert("حدث خطأ أثناء الاشتراك. يرجى المحاولة لاحقًا.");
        }
    })
    .catch(error => {
        alert("فشل الاتصال بالسيرفر. تأكد من اتصالك بالإنترنت.");
        console.error(error);
    });
});
