
let anaBasliklar = document.querySelector('#anaBasliklar')
let altBasliklar = document.querySelector('#altBasliklar')
let hesaplaPop = document.querySelector('#hesaplaPop')



fetch('baslik.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {                          //data'yı dön ve her birini item'a ata
            let h2 = document.createElement('h2')       //değişken adı h2 olan bir h2 html elementi oluştur.
            h2.textContent = `| ${item.ustBaslik} |`    // h2 elementine item'ın içinde üst başlıkları yaz
            h2.dataset.ustBaslik = item.ustBaslik       //h2.dataset.ustBaslik ile item.ustBaslik ları eşitse
            anaBasliklar.appendChild(h2)                //anaBasliklar elementinin içine h2'yi ekliyor.
            // window.location.href = "index.html"
        });
        // Hangi Başlığa Tıklandığını Yakalayan Kod Bloğu Start
        anaBasliklar.addEventListener('click', function (event) {
            event.preventDefault()
            if (event.target.tagName === 'H2') {
                let secilenBaslik = event.target.dataset.ustBaslik      //string olarak hangi başlık seçildiyse onu yakalıyor.

                // Hangi Başlığa Tıklandığını Yakalayan Kod Bloğu End

                altBasliklar.innerHTML = ""

                // Tıklanan Başlığın içindeki Alt Başlığı Dönen Kod Bloğu Start
                let secilen = data.find(item => item.ustBaslik === secilenBaslik)       //hangi başlık seçildiyse onu json'dan çekiyor.

                if (secilen) {
                    secilen.altBasliklar.forEach(ustB => {
                        let h4 = document.createElement('h4')
                        h4.textContent = `| ${ustB} |`
                        h4.dataset.altBasliklar = ustB
                        altBasliklar.appendChild(h4)
                        console.log(secilen)
                    })
                }
                // Tıklanan Başlığın içindeki Alt Başlığı Dönen Kod Bloğu End

                altBasliklar.addEventListener('click', function (event) {
                    event.preventDefault()
                    if (event.target.tagName === 'H4') {
                        let secilenAltBaslik = event.target.dataset.altBasliklar
                        console.log(secilenAltBaslik)

                        if (event.target.tagName === 'H4') {
                            if (secilenAltBaslik == "Kredi Dosya Masrafı Hesaplama Aracı") {
                                hesaplaPop.style = "display:flex; row-gap:20px;"

                                hesaplaPop.innerHTML = `<div style="margin-top: -50px;"><h3>| ${secilenAltBaslik} |</h3></div><form><b>Kredi Tutarı:</b><div><input type="text" name="" id="dmGiris"><input type="submit" value="Hesapla" id="dmHesapla"></div></form>`


                                let dmGiris = document.querySelector('#dmGiris')
                                let dmHesapla = document.querySelector('#dmHesapla')

                                dmHesapla.addEventListener('click', function (event) {
                                    event.preventDefault()
                                    let KDM = dmGiris.value * 0.005
                                    if (dmGiris.value == '') {
                                        alert('Lütfen tüm alanların doldurulduğundan emin olunuz.')
                                    } else {
                                        hesaplaPop.innerHTML = `<div><div><h3>${secilenAltBaslik} Sonuçları</h3></div><b>Kredi Dosya Masrafınız:</b><span>${KDM} TL'dir.</span></div><p>Burada hesaplanan dosya masrafı tutarı, kredi veren kuruluş tarafından kredi kullanan müşteriden istenebilecek en yüksek dosya masrafı tutarını belirtmektedir. Kredi veren kuruluş, kredi çeken müşteriden kredi kullanımı esnasında dosya masrafına ek olarak sigorta, ipotek ve ekspertiz masrafı gibi ücretler isteyebilmektedir. Bu ücretler dosya masrafına dahil değildir. Çünkü bu ücretler kredi veren kuruluşlarca işlemi yapan kuruluşlara (sigorta şirketlerine, ekspertiz firmalarına vs.) aktarılmak üzere tahsil edilmektedir.</p>`
                                    }
                                })
                            } else if (secilenAltBaslik == "Kredi Erken Kapatma Cezası Hesaplama Aracı") {
                                hesaplaPop.style = "display:flex;flex-direction: column;justify-content: center;"
                                hesaplaPop.innerHTML = `<div><h3>| ${secilenAltBaslik} |</h3></div><div style="background-color: #2D3940;color: #fff;margin-bottom: 20px; padding:5px 5px;border-radius: 4px;">NOT: Konut dışı kredilerde erken kapatma cezası alınmamaktadır.</div><form style="display: flex;flex-direction: column;row-gap: 10px;"><b>Kredi Türü:Konut Kredisi</b><div><div><b>1-36 Ay</b><input type="radio" name="vade" id="radioVade1" value="1-36Ay"><div></div><b>36+ Ay</b><input type="radio" name="vade" id="radioVade2" value="36+Ay"></div></div><div><b>Erken Ödeme Tutarı: </b><input type="text" name="" id="erkenKapatma"><input type="submit" value="Hesapla" id="ekHesaplama"></div></form>`
                                event.preventDefault()
                                let erkenKapatma = document.querySelector('#erkenKapatma')
                                let ekHesaplama = document.querySelector('#ekHesaplama')


                                ekHesaplama.addEventListener('click', function (event) {
                                    event.preventDefault()
                                    let selectedRadio = document.querySelector('input[name="vade"]:checked')

                                    if (erkenKapatma.value == '') {
                                        alert('Hatalı veya Eksik Giriş Yaptınız. Lütfen Alanları Kontrol Ediniz.')
                                    } else {
                                        if (selectedRadio.value == '1-36Ay') {
                                            hesaplaPop.innerHTML = `<div><h3>${secilenAltBaslik} Sonuçları</h3></div><div style="display:flex;flex-direction: column; row-gap:20px"><div><b>Maksimum Erken Kapatma Tazminatı Oranı: </b>Kalan kredi vadesi 36 aydan az olan konut kredilerinde genelde %1 olarak uygulanmaktadır. Kredi sözleşmenizi inceleyerek hangi oranda ceza ödeyeceğinizi kesinleştirebilirsiniz.</div><div><b>Maksimum Erken Kapatma Tazminatı Tutarı:</b> ${erkenKapatma.value / 100} TL</div></div>`
                                        } else if (selectedRadio.value == '36+Ay') {
                                            hesaplaPop.innerHTML = `<div style="display:flex;flex-direction: column; row-gap:20px"><div><b>Maksimum Erken Kapatma Tazminatı Oranı: </b>Kalan kredi vadesi 36 aydan az olan konut kredilerinde genelde %2 olarak uygulanmaktadır. Kredi sözleşmenizi inceleyerek hangi oranda ceza ödeyeceğinizi kesinleştirebilirsiniz.</div><div><b>Maksimum Erken Kapatma Tazminatı Tutarı:</b> ${(erkenKapatma.value / 100) * 2} TL</div></div>`
                                        } else if (selectedRadio.value < 1) {
                                            alert('Hatalı Giriş Yaptınız.')
                                        }
                                    }
                                })
                            } else if (secilenAltBaslik == "Kredi Kartı Asgari Ödeme Tutarı Hesaplama Aracı") {
                                hesaplaPop.innerHTML = `<div><h3>| ${secilenAltBaslik} |</h3><div style="background-color: #2D3940;color: #fff;margin-bottom: 20px; padding:5px 5px;border-radius: 4px;">NOT: Hesaplama aracımız BDDK'nın 26.09.2024 tarihinde yürürlüğe giren yeni kredi kartı düzenlemesine göre işlem yapmaktadır.</div><form style="display:flex;flex-direction: column; row-gap:20px"><div><b>Dönem Borcu: </b><input type="text" name="" id="donemBorcu"></div><div><b style="margin-right: 14px;">Kart Limiti: </b><input type="text" name="" id="kartLimiti"></div><input type="submit" value="Hesapla" id="asgariHesapla"></form></div>`

                                let donemBorcu = document.querySelector('#donemBorcu')
                                let kartLimiti = document.querySelector('#kartLimiti')
                                let asgariHesapla = document.querySelector('#asgariHesapla')

                                asgariHesapla.addEventListener('click', function (event) {
                                    event.preventDefault()
                                    let sonuc = (((((donemBorcu.value / 100) * 80) / 100) * 4.25) / 25)

                                    if (donemBorcu.value == '' || kartLimiti.value == '') {
                                        alert('Tüm alanların dolu olduğundan emin olunuz.')
                                    } else {
                                        hesaplaPop.innerHTML = `<div><div><h3>${secilenAltBaslik} Sonuçları</h3></div><div style="display: flex;flex-direction: column;row-gap: 5px;"><div><b>Dönem Borcu: </b>${donemBorcu.value} TL</div> <div><div></div></div><div><b>Ödenmesi Gereken Asgari Tutar:</b> ${(donemBorcu.value / 100) * 20} TL</div><div><b>Asgari Ödeme Sonrası Borç Bakiyesi:</b>${(donemBorcu.value / 100) * 80} TL</div><div><b>Kalan Borç İçin Günlük Gecikme Faizi Tutarı:</b>${sonuc} TL</div><div style="background-color: #2D3940;color: #fff;margin-bottom: 20px; padding:5px 5px;border-radius: 4px;">Bilgi: Asgari ödeme yapılması durumunda kalan borç için günlük gecikme faizi hesaplanırken, güncel akdi faiz oranı olan %4,25 kullanılmıştır. Hesaplanan gecikme faizine BSMV ve KKDF dahildir.</div></div></div>`
                                    }
                                })
                            }
                            else if (secilenAltBaslik == "Altın Hesaplama Aracı") {
                                hesaplaPop.style = "display:flex;flex-direction: column;justify-content: center;"
                                hesaplaPop.innerHTML = `<div>
                                                            <div>
                                                                <h3>| ${secilenAltBaslik} |</h3>
                                                            </div>
                                                            <form style="flex-direction: column;row-gap: 10px;">
                                                                <div>
                                                                    <div>
                                                                    <b>İşlem Türü </b>
                                                                        <div id="radioChange">
                                                                        <div>Altından Paraya<input type="radio" name="altinPara" id="onsTl" value="altPara"></div>
                                                                        <div>Paradan Altına<input type="radio" name="altinPara" id="tlOns" value="paraAlt"></div>
                                                                        </div>
                                                                    </div>
                                                                    <div style="margin-top:10px">
                                                                        <select name="" id="altinTuru">
                                                                            <option value="">Seçiniz</option>
                                                                            <option value="4011">24 Ayar Gram Altın</option>
                                                                            <option value="26430">Tam Ziynet Altın</option>
                                                                            <option value="13255">Yarım Ziynet Altın</option>
                                                                            <option value="6650">Çeyrek Ziynet Altın</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div id="aldiv" style="display:none;">
                                                                <b>Miktar: </b><input type="text" name="" id="altinGiris"> gram (Örn: 25 gram) 
                                                                <input type="submit" value="Hesapla" id="aldanPar">
                                                                </div>
                                                                <div id="pardiv" style="display:none;">
                                                                <b>Tutar: </b><input type="text" name="" id="tlGiris"> TL (Örn: 12500 TL) 
                                                                <input type="submit" value="Hesapla" id="pardanAl">
                                                                </div>
                                                            </form>
                                                        </div>`

                                let altinTuru = document.querySelector('#altinTuru')
                                let altinGiris = document.querySelector('#altinGiris')
                                let tlGiris = document.querySelector('#tlGiris')
                                const onsTlRadio = document.getElementById("onsTl");
                                const tlOnsRadio = document.getElementById("tlOns");
                                const alDiv = document.getElementById("aldiv");
                                const parDiv = document.getElementById("pardiv");
                                let aldanPar = document.querySelector('#aldanPar')
                                let pardanAl = document.querySelector('#pardanAl')



                                function handleRadioChange() {
                                    if (onsTlRadio.checked) {
                                        alDiv.style.display = "flex";
                                        parDiv.style.display = "none";
                                    } else if (tlOnsRadio.checked) {
                                        alDiv.style.display = "none";
                                        parDiv.style.display = "flex";
                                    }
                                }
                                onsTlRadio.addEventListener("change", handleRadioChange);
                                tlOnsRadio.addEventListener("change", handleRadioChange);

                                altinTuru.addEventListener("change", function () {
                                    event.preventDefault()
                                    const selectedVal = altinTuru.value;
                                    console.log("Seçilen value:", selectedVal);
                                });

                                aldanPar.addEventListener('click', function (event) {
                                    event.preventDefault()
                                    if (onsTlRadio.checked) {
                                        if (altinTuru.value == '' || altinGiris.value == '') {
                                            alert('Lütfen Tüm Alanları Doldurduğunuzdan Emin Olun')
                                        } else {
                                            hesaplaPop.innerHTML = `<div style="display:flex; flex-direction:column; row-gap:10px;">
                                                                        <div><h3>${secilenAltBaslik} Sonuçları</h3></div>
                                                                        <div><b>Alış Birim Fiyatı: </b>1 gram 24 Ayar Altın için alış fiyatı ${altinTuru.value} TL'dir</div>
                                                                        <div><b>Alış Miktarı: </b>${altinGiris.value} gram 24 Ayar Altın</div>
                                                                        <div><b>Alış Tutarı: </b>${altinGiris.value * altinTuru.value} TL'dir</div>
                                                                        <div style="background-color: #2D3940;color: #fff;margin-bottom: 20px; padding:5px 5px;border-radius: 4px;"><b>Bilgi:</b> Bu hesaplama 02.05.2025 23:00 tarihindeki piyasa verileri kullanılarak yapılmıştır</div>
                                                                    </div>`
                                        }
                                    }
                                })
                                pardanAl.addEventListener('click', function (event) {
                                    event.preventDefault()
                                    if (tlOnsRadio.checked) {
                                        if (altinTuru.value == '' || tlGiris.value == '') {
                                            alert('Lütfen Tüm Alanları Doldurduğunuzdan Emin Olun')
                                        } else {
                                            hesaplaPop.innerHTML = `<div style="display:flex; flex-direction:column; row-gap:10px;">
                                                                        <div><h3>${secilenAltBaslik} Sonuçları</h3></div>
                                                                        <div><b>Alış Birim Fiyatı: </b>1 gram 24 Ayar Altın için alış fiyatı ${altinTuru.value} TL'dir</div>
                                                                        <div><b>Alış Miktarı: </b>${tlGiris.value / altinTuru.value} gram 24 Ayar Altın</div>
                                                                        <div><b>Alış Tutarı: </b>${tlGiris.value} TL'dir</div>
                                                                        <div style="background-color: #2D3940;color: #fff;margin-bottom: 20px; padding:5px 5px;border-radius: 4px;"><b>Bilgi:</b> Bu hesaplama 02.05.2025 23:00 tarihindeki piyasa verileri kullanılarak yapılmıştır</div>
                                                                    </div>`
                                        }
                                    }
                                })
                            } else if (secilenAltBaslik == "Dolar Hesaplama Aracı") {
                                hesaplaPop.style = "display:flex;flex-direction: column;justify-content: center;"
                                hesaplaPop.innerHTML = `<div>
                                                            <div>
                                                                <h3>| ${secilenAltBaslik} |</h3>
                                                            </div>
                                                            <form style="flex-direction: column;row-gap: 10px;">
                                                                <div>
                                                                    <div>
                                                                    <b>İşlem Türü </b>
                                                                        <div id="radioChangeDolar">
                                                                        <div>Dolar'dan Lira'ya<input type="radio" name="dolarLira" id="dolarTl" value="dolarLira"></div>
                                                                        <div>Lira'dan Dolara<input type="radio" name="dolarLira" id="tlDolar" value="liraDolar"></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div id="dolarDiv">
                                                                <b>Tutar: </b><input type="text" name="" id="dolarGiris"> 
                                                                <input type="submit" value="Hesapla" id="dolardanLira">
                                                                </div>
                                                            </form>
                                                        </div>`

                                let dolarGiris = document.querySelector('#dolarGiris')
                                let dolarLiraRadio = document.getElementById("dolarTl")
                                let liraDolarRadio = document.getElementById("tlDolar")
                                let dolardanLira = document.querySelector('#dolardanLira')

                                dolarLiraRadio.value = 35
                                liraDolarRadio.value = 0.026

                                dolardanLira.addEventListener('click', function (event) {
                                    event.preventDefault()
                                    if (dolarLiraRadio.checked) {
                                        if (dolarGiris.value == '' && dolarLiraRadio.checked == 1) {
                                            alert('Lütfen Tüm Alanları Doldurduğunuzdan Emin Olun')
                                        } else {
                                            hesaplaPop.innerHTML = `<div style="display:flex; flex-direction:column; row-gap:10px;">
                                                                        <div><h3>${secilenAltBaslik} Sonuçları</h3></div>
                                                                        <div><b>Alış Birim Fiyatı: </b>1 Dolar ${dolarLiraRadio.value} TL'dir</div>
                                                                        <div><b>Giriş Miktarınız: </b>${dolarGiris.value} Dolar</div>
                                                                        <div>${dolarGiris.value} Dolar için ödemeniz gereken toplam tutar ${dolarGiris.value * dolarLiraRadio.value} TL'dir</div>
                                                                        <div style="background-color: #2D3940;color: #fff;margin-bottom: 20px; padding:5px 5px;border-radius: 4px;"><b>Bilgi:</b> Bu hesaplama 02.05.2025 23:00 tarihindeki piyasa verileri kullanılarak yapılmıştır</div>
                                                                    </div>`
                                        }
                                    } else if (liraDolarRadio.checked) {
                                        if (dolarGiris.value == '') {
                                            alert('Lütfen Tüm Alanları Doldurduğunuzdan Emin Olun')
                                        } else {
                                            hesaplaPop.innerHTML = `<div style="display:flex; flex-direction:column; row-gap:10px;">
                                                                        <div><h3>${secilenAltBaslik} Sonuçları</h3></div>
                                                                        <div><b>Alış Birim Fiyatı: </b>1 Türk Lira'sı ${dolarLiraRadio.value} Dolar'dır.</div>
                                                                        <div><b>Giriş Miktarınız: </b>${dolarGiris.value} Lira</div>
                                                                        <div>${dolarGiris.value} Türk Lira'sı için ödemeniz gereken toplam tutar ${dolarGiris.value / dolarLiraRadio.value} Dolar'dır.</div>
                                                                        <div style="background-color: #2D3940;color: #fff;margin-bottom: 20px; padding:5px 5px;border-radius: 4px;"><b>Bilgi:</b> Bu hesaplama 02.05.2025 23:00 tarihindeki piyasa verileri kullanılarak yapılmıştır</div>
                                                                    </div>`
                                        }
                                    }
                                })
                            } else if (secilenAltBaslik == "Euro Hesaplama Aracı") {
                                hesaplaPop.style = "display:flex;flex-direction: column;justify-content: center;"
                                hesaplaPop.innerHTML = `<div>
                                                            <div>
                                                                <h3>| ${secilenAltBaslik} |</h3>
                                                            </div>
                                                            <form style="flex-direction: column;row-gap: 10px;">
                                                                <div>
                                                                    <div>
                                                                    <b>İşlem Türü </b>
                                                                        <div id="radioChangeEuro">
                                                                        <div>Euro'dan Lira'ya<input type="radio" name="euroLira" id="euroTl" value="euroLira"></div>
                                                                        <div>Lira'dan Euro'ya<input type="radio" name="euroLira" id="tlEuro" value="liraEuro"></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div id="euroDiv">
                                                                <b>Tutar: </b><input type="text" name="" id="euroGiris"> 
                                                                <input type="submit" value="Hesapla" id="eurodanLira">
                                                                </div>
                                                            </form>
                                                        </div>`

                                let euroGiris = document.querySelector('#euroGiris')
                                let euroLiraRadio = document.getElementById("euroTl");
                                let liraEuroRadio = document.getElementById("tlEuro");
                                let euroDiv = document.getElementById("euroDiv");
                                let eurodanLira = document.querySelector('#eurodanLira')

                                euroLiraRadio.value = 40
                                liraEuroRadio.value = 0.023

                                eurodanLira.addEventListener('click', function (event) {
                                    event.preventDefault()
                                    if (euroLiraRadio.checked) {
                                        if (euroGiris.value == '') {
                                            alert('Lütfen Tüm Alanları Doldurduğunuzdan Emin Olun')
                                        } else {
                                            hesaplaPop.innerHTML = `<div style="display:flex; flex-direction:column; row-gap:10px;">
                                                                        <div><h3>${secilenAltBaslik} Sonuçları</h3></div>
                                                                        <div><b>Alış Birim Fiyatı: </b>1 Euro ${euroLiraRadio.value} TL'dir</div>
                                                                        <div><b>Giriş Miktarınız: </b>${euroGiris.value} Euro</div>
                                                                        <div>${euroGiris.value} Euro için ödemeniz gereken toplam tutar ${euroGiris.value * euroLiraRadio.value} TL'dir</div>
                                                                        <div style="background-color: #2D3940;color: #fff;margin-bottom: 20px; padding:5px 5px;border-radius: 4px;"><b>Bilgi:</b> Bu hesaplama 02.05.2025 23:00 tarihindeki piyasa verileri kullanılarak yapılmıştır</div>
                                                                    </div>`
                                        }
                                    } else if (liraEuroRadio.checked) {
                                        if (euroGiris.value == '') {
                                            alert('Lütfen Tüm Alanları Doldurduğunuzdan Emin Olun')
                                        } else {
                                            hesaplaPop.innerHTML = `<div style="display:flex; flex-direction:column; row-gap:10px;">
                                                                        <div><h3>${secilenAltBaslik} Sonuçları</h3></div>
                                                                        <div><b>Alış Birim Fiyatı: </b>1 Türk Lira'sı ${euroLiraRadio.value} Euro'dur.</div>
                                                                        <div><b>Giriş Miktarınız: </b>${euroGiris.value} Lira</div>
                                                                        <div>${euroGiris.value} Türk Lira'sı için ödemeniz gereken toplam tutar ${euroGiris.value / euroLiraRadio.value} Euro'dur.</div>
                                                                        <div style="background-color: #2D3940;color: #fff;margin-bottom: 20px; padding:5px 5px;border-radius: 4px;"><b>Bilgi:</b> Bu hesaplama 02.05.2025 23:00 tarihindeki piyasa verileri kullanılarak yapılmıştır</div>
                                                                    </div>`
                                        }
                                    }
                                })
                            } else if (secilenAltBaslik == "Sterlin Hesaplama Aracı") {
                                hesaplaPop.style = "display:flex;flex-direction: column;justify-content: center;"
                                hesaplaPop.innerHTML = `<div>
                                                            <div>
                                                                <h3>| ${secilenAltBaslik} |</h3>
                                                            </div>
                                                            <form style="flex-direction: column;row-gap: 10px;">
                                                                <div>
                                                                    <div>
                                                                    <b>İşlem Türü </b>
                                                                        <div id="radioChangeSterlin">
                                                                        <div>Sterlin'den Lira'ya<input type="radio" name="sterlinLira" id="sterlinTl" value="sterlinLira"></div>
                                                                        <div>Lira'dan Sterlin'e<input type="radio" name="sterlinLira" id="tlSterlin" value="liraSterlin"></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div id="euroDiv">
                                                                <b>Tutar: </b><input type="text" name="" id="sterlinGiris"> 
                                                                <input type="submit" value="Hesapla" id="sterlindenLira">
                                                                </div>
                                                            </form>
                                                        </div>`

                                let sterlinGiris = document.querySelector('#sterlinGiris')
                                let sterlinLiraRadio = document.getElementById("sterlinTl");
                                let liraSterlinRadio = document.getElementById("tlSterlin");
                                let sterlinDiv = document.getElementById("sterlinDiv");
                                let sterlindenLira = document.querySelector('#sterlindenLira')

                                sterlinLiraRadio.value = 40
                                liraSterlinRadio.value = 0.023

                                sterlindenLira.addEventListener('click', function (event) {
                                    event.preventDefault()
                                    if (sterlinLiraRadio.checked) {
                                        if (sterlinGiris.value == '') {
                                            alert('Lütfen Tüm Alanları Doldurduğunuzdan Emin Olun')
                                        } else {
                                            hesaplaPop.innerHTML = `<div style="display:flex; flex-direction:column; row-gap:10px;">
                                                                        <div><h3>${secilenAltBaslik} Sonuçları</h3></div>
                                                                        <div><b>Alış Birim Fiyatı: </b>1 Sterlin ${sterlinLiraRadio.value} TL'dir</div>
                                                                        <div><b>Giriş Miktarınız: </b>${sterlinGiris.value} Sterlin</div>
                                                                        <div>${sterlinGiris.value} Sterlin için ödemeniz gereken toplam tutar ${sterlinGiris.value * sterlinLiraRadio.value} TL'dir</div>
                                                                        <div style="background-color: #2D3940;color: #fff;margin-bottom: 20px; padding:5px 5px;border-radius: 4px;"><b>Bilgi:</b> Bu hesaplama 02.05.2025 23:00 tarihindeki piyasa verileri kullanılarak yapılmıştır</div>
                                                                    </div>`
                                        }
                                    } else if (liraSterlinRadio.checked) {
                                        if (sterlinGiris.value == '') {
                                            alert('Lütfen Tüm Alanları Doldurduğunuzdan Emin Olun')
                                        } else {
                                            hesaplaPop.innerHTML = `<div style="display:flex; flex-direction:column; row-gap:10px;">
                                                                        <div><h3>${secilenAltBaslik} Sonuçları</h3></div>
                                                                        <div><b>Alış Birim Fiyatı: </b>1 Türk Lira'sı ${liraSterlinRadio.value} Euro'dur.</div>
                                                                        <div><b>Giriş Miktarınız: </b>${sterlinGiris.value} Lira</div>
                                                                        <div>${sterlinGiris.value} Türk Lira'sı için ödemeniz gereken toplam tutar ${sterlinGiris.value / sterlinLiraRadio.value} Euro'dur.</div>
                                                                        <div style="background-color: #2D3940;color: #fff;margin-bottom: 20px; padding:5px 5px;border-radius: 4px;"><b>Bilgi:</b> Bu hesaplama 02.05.2025 23:00 tarihindeki piyasa verileri kullanılarak yapılmıştır</div>
                                                                    </div>`
                                        }
                                    }
                                })
                            } else if (secilenAltBaslik == "Ders Notu Hesaplama Aracı") {
                                hesaplaPop.style = "display:flex;flex-direction: column;justify-content: flex-start;"
                                hesaplaPop.innerHTML = `<form style = "flex-direction: column;"><div>
                                                            <div style="background-color: #2D3940;color: #fff;margin-top: 10px; padding:5px 5px;border-radius: 4px;"><b>NOT: </b>2023 - 2024 eğitim yılı ve sonrasına (2024 - 2025 dahil) uyumlu olarak hazırlanmıştır. Puanını boş bıraktığınız kısımlar ortalama hesaplamalarına dahil edilmeyecektir.</div>
                                                            <div><h3 style="margin: 13px 0px;">| ${secilenAltBaslik} |</h3></div>
                                                                <table>
                                                                    <tbody>
                                                                        <tr id="tr" style="display:flex; flex-direction:column; row-gap:5px;align-items: end;margin-left: 80px;">
                                                                            <td><div><b>1. Yazılı Sınav:</b><input type="text" name="" id="sinav"></div></td>
                                                                            <td><div><b>2. Yazılı Sınav:</b><input type="text" name="" id="sinavv"></div></td>
                                                                            <td><div><b>1. Performans Görevi: </b><input type="text" name="" id="etkinlik"></div></td>
                                                                            <td><div><b>2. Performans Görevi: </b><input type="text" name="" id="etkinlikk"></div></td>
                                                                            <td><div><b>3. Ders Etkinlik Katılım: </b><input type="text" name="" id="etkinlikkk"></div></td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                <input type="submit" value="Hesapla" id="dersHesapla" style="width:67%; margin-top:5px;"></div></form>`

                                let sinav = document.querySelector('#sinav')
                                let sinavv = document.querySelector('#sinavv')
                                let etkinlik = document.querySelector('#etkinlik')
                                let etkinlikk = document.querySelector('#etkinlikk')
                                let etkinlikkk = document.querySelector('#etkinlikkk')
                                let dersHesapla = document.querySelector('#dersHesapla')

                                dersHesapla.addEventListener('click', function (event) {
                                    hesaplaPop.style = "display:flex;"
                                    event.preventDefault()
                                    if (sinav.value == "" && sinavv.value == "" && etkinlik.value == "" && etkinlikk.value == "" && etkinlikkk.value == "") {
                                        alert('Hata oluştu.')
                                    } else if (sinav.value !== "" && etkinlik.value !== "") {
                                        hesaplaPop.innerHTML = `<h3>${secilenAltBaslik} Sonuçları</h3><div style="display:flex; row-gap:5px;flex-direction: inherit;"><div><b>Yazılı Sınav Ortalaması: </b>${sinav.value}</div><div><b>Ders Etkinliklerine Katılım Ortalaması:</b> ${etkinlik.value}</div><div><b>Dersin Dönem Puanı: </b>${(parseFloat(sinav.value) + parseFloat(etkinlik.value)) / 2}</div></div>`
                                    } else if (sinav.value !== "" && sinavv.value !== "" && etkinlik.value !== "") {
                                        hesaplaPop.innerHTML = `<h3>${secilenAltBaslik} Sonuçları</h3>${(parseFloat(sinav.value) + parseFloat(sinavv.value) + parseFloat(etkinlik.value)) / 3}`
                                    } else if (sinav.value !== "" && sinavv.value !== "" && etkinlik.value !== "" && etkinlikk.value !== "") {
                                        hesaplaPop.innerHTML = `<h3>${secilenAltBaslik} Sonuçları</h3>${(parseFloat(sinav.value) + parseFloat(sinavv.value) + parseFloat(etkinlik.value) + parseFloat(etkinlikk.value)) / 4}`
                                    } else if (sinav.value !== "" && sinavv.value !== "" && etkinlik.value !== "" && etkinlikk.value !== "" && etkinlikkk.value !== "") {
                                        hesaplaPop.innerHTML = `<h3>${secilenAltBaslik} Sonuçları</h3>${(parseFloat(sinav.value) + parseFloat(sinavv.value) + parseFloat(etkinlik.value) + parseFloat(etkinlikk.value) + parseFloat(etkinlikkk.value)) / 5}`
                                    }
                                })
                            } else if (secilenAltBaslik == "Lise Ders Puanı Hesaplama") {
                                hesaplaPop.style = "display:flex;flex-direction: column;justify-content: flex-start;"
                                hesaplaPop.innerHTML = `<form style = "flex-direction: column;"><div>
                                                            <div style="background-color: #2D3940;color: #fff;margin-top: 10px; padding:5px 5px;border-radius: 4px;"><b>NOT: </b>2023 - 2024 eğitim yılı ve sonrasına (2024 - 2025 dahil) uyumlu olarak hazırlanmıştır. Puanını boş bıraktığınız kısımlar ortalama hesaplamalarına dahil edilmeyecektir.</div>
                                                            <div><h3 style="margin: 13px 0px;">| ${secilenAltBaslik} |</h3></div>
                                                                <table>
                                                                    <tbody>
                                                                        <tr id="tr" style="display:flex; flex-direction:column; row-gap:5px;align-items: end;margin-left: 80px;">
                                                                            <td><div><b>1. Yazılı Sınav:</b><input type="text" name="" id="sinav1"></div></td>
                                                                            <td><div><b>2. Yazılı Sınav:</b><input type="text" name="" id="sinav2"></div></td>
                                                                            <td><div><b>1. Performans Görevi: </b><input type="text" name="" id="performans1"></div></td>
                                                                            <td><div><b>2. Performans Görevi: </b><input type="text" name="" id="performans2"></div></td>
                                                                            <td><div><b>1.Uygulama: </b><input type="text" name="" id="uygulama1"></div></td>
                                                                            <td><div><b>2.Uygulama: </b><input type="text" name="" id="uygulama2"></div></td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                <input type="submit" value="Hesapla" id="liseDersHesapla" style="width:67%; margin-top:5px;"></div></form>`

                                let sinav1 = document.querySelector('#sinav1')
                                let sinav2 = document.querySelector('#sinav2')
                                let performans1 = document.querySelector('#performans1')
                                let performans2 = document.querySelector('#performans2')
                                let uygulama1 = document.querySelector('#uygulama1')
                                let uygulama2 = document.querySelector('#uygulama2')
                                let liseDersHesapla = document.querySelector('#liseDersHesapla')

                                liseDersHesapla.addEventListener('click', function (event) {
                                    hesaplaPop.style = "display:flex;"
                                    event.preventDefault()
                                    if (sinav1.value == "" && sinav2.value == "" && performans1.value == "" && performans2.value == "" && uygulama1.value == "" && uygulama2.value == "") {
                                        alert('Hata oluştu.')
                                    }
                                    else if (sinav1.value !== "" && sinav2.value !== "" && performans1.value !== "" && performans2.value !== "" && uygulama1.value !== "" && uygulama2.value !== "") {
                                        hesaplaPop.innerHTML = `<h3>${secilenAltBaslik} Sonuçları</h3><div style="display:flex; row-gap:5px;flex-direction: inherit;">
                                                                                                        <div><b>Yazılı Sınav Ortalaması: </b>${parseFloat(sinav1.value) + parseFloat(sinav2.value)}</div>
                                                                                                        <div><b>Performans Puan Ortalaması:</b> ${(parseFloat(performans1.value) + parseFloat(performans2.value))}</div>
                                                                                                        <div><b>Uygulama Puan Ortalaması:</b> ${(parseFloat(uygulama1.value) + parseFloat(uygulama2.value))}</div>
                                                                                                        <div><b>Dersin Dönem Puanı: </b>${(parseFloat(sinav1.value) + parseFloat(sinav2.value) + parseFloat(performans1.value) + parseFloat(performans2.value) + parseFloat(uygulama1.value) + parseFloat(uygulama2.value)) / 6}</div>
                                                                                                    </div>`
                                    } else if (sinav1.value !== "" && sinav2.value !== "" && performans1.value !== "" && performans2.value !== "" && uygulama1.value !== "") {
                                        hesaplaPop.innerHTML = `<h3>${secilenAltBaslik} Sonuçları</h3><div style="display:flex; row-gap:5px;flex-direction: inherit;">
                                                                                                        <div><b>Yazılı Sınav Ortalaması: </b>${parseFloat(sinav1.value) + parseFloat(sinav2.value)}</div>
                                                                                                        <div><b>Performans Puan Ortalaması:</b> ${(parseFloat(performans1.value) + parseFloat(performans2.value))}</div>
                                                                                                        <div><b>Uygulama Puan Ortalaması:</b> ${parseFloat(uygulama1.value)}</div>
                                                                                                        <div><b>Dersin Dönem Puanı: </b>${(parseFloat(sinav1.value) + parseFloat(sinav2.value) + parseFloat(performans1.value) + parseFloat(performans2.value) + parseFloat(uygulama1.value)) / 5}</div>
                                                                                                    </div>`
                                    } else if (sinav1.value !== "" && sinav2.value !== "" && performans1.value !== "" && performans2.value !== "") {
                                        hesaplaPop.innerHTML = `<h3>${secilenAltBaslik} Sonuçları</h3><div style="display:flex; row-gap:5px;flex-direction: inherit;">
                                                                                                        <div><b>Yazılı Sınav Ortalaması: </b>${parseFloat(sinav1.value) + parseFloat(sinav2.value)}</div>
                                                                                                        <div><b>Performans Puan Ortalaması:</b> ${(parseFloat(performans1.value) + parseFloat(performans2.value))}</div>
                                                                                                        <div><b>Dersin Dönem Puanı: </b>${(parseFloat(sinav1.value) + parseFloat(sinav2.value) + parseFloat(performans1.value) + parseFloat(performans2.value)) / 4}</div>
                                                                                                    </div>`
                                    } else if (sinav1.value !== "" && sinav2.value !== "" && performans1.value !== "") {
                                        hesaplaPop.innerHTML = `<h3>${secilenAltBaslik} Sonuçları</h3><div style="display:flex; row-gap:5px;flex-direction: inherit;"><div><b>Yazılı Sınav Ortalaması: </b>${parseFloat(sinav1.value) + parseFloat(sinav2.value)}</div><div><b>Performans Puan Ortalaması:</b> ${performans1.value}</div><div><b>Dersin Dönem Puanı: </b>${(parseFloat(sinav1.value) + parseFloat(sinav2.value) + parseFloat(performans1.value)) / 3}</div></div>`
                                    } else if (sinav1.value !== "" && uygulama1.value !== "") {
                                        hesaplaPop.innerHTML = `<h3>${secilenAltBaslik} Sonuçları</h3><div style="display:flex; row-gap:5px;flex-direction: inherit;"><div><b>Yazılı Sınav Ortalaması: </b>${sinav1.value}</div><div><b>Uygulama Puanı Ortalaması:</b> ${uygulama1.value}</div><div><b>Dersin Dönem Puanı: </b>${(parseFloat(sinav1.value) + parseFloat(uygulama1.value)) / 2}</div></div>`
                                    } else if (sinav1.value !== "" && performans1.value !== "") {
                                        hesaplaPop.innerHTML = `<h3>${secilenAltBaslik} Sonuçları</h3><div style="display:flex; row-gap:5px;flex-direction: inherit;"><div><b>Yazılı Sınav Ortalaması: </b>${sinav1.value}</div><div><b>Performans Puan Ortalaması:</b> ${performans1.value}</div><div><b>Dersin Dönem Puanı: </b>${(parseFloat(sinav1.value) + parseFloat(performans1.value)) / 2}</div></div>`
                                    } else if (sinav1.value !== "" && sinav2.value !== "") {
                                        hesaplaPop.innerHTML = `<h3>${secilenAltBaslik} Sonuçları</h3><div style="display:flex; row-gap:5px;flex-direction: inherit;"><div><b>Yazılı Sınav Ortalaması: </b>${sinav1.value}</div><div><b>Dersin Dönem Puanı: </b>${(parseFloat(sinav1.value) + parseFloat(sinav2.value)) / 2}</div></div>`
                                    } else {
                                        alert('Hata oluştu.')
                                    }
                                })
                            }

                            else if (secilenAltBaslik == "Aşı Takvimi") {
                                hesaplaPop.style = "display:flex;"
                                hesaplaPop.innerHTML = `<h3>${secilenAltBaslik} Hesaplaması</h3><form style="display:flex; flex-direction:column;"><input type="date" name="" id="girilenTarih" style="width:160px; padding:0px;"><input type="submit" value="Hesapla" id="asiHesapla" style="width:33%;margin-top:5px;"></form>`

                                let girilenTarih = document.querySelector('#girilenTarih')
                                let asiHesapla = document.querySelector('#asiHesapla')

                                asiHesapla.addEventListener('click', function (event) {
                                    event.preventDefault()
                                    // Kullanıcıdan tarih al (örnek format: "2025-05-06")
                                    let tarihStr = girilenTarih.value
                                    let tarih = new Date(tarihStr)
                                    // 30 gün ekle
                                    tarih.setDate(tarih.getDate() + 60)
                                    // Yeni tarihi yazdır
                                    let yeniTarihStr = tarih.toISOString().split('T')[0];

                                    tarih.setDate(tarih.getDate() + 60)
                                    let yeniTarihStr2 = tarih.toISOString().split('T')[0];

                                    tarih.setDate(tarih.getDate() + 60)
                                    let yeniTarihStr3 = tarih.toISOString().split('T')[0];

                                    tarih.setDate(tarih.getDate() + 90)
                                    let yeniTarihStr4 = tarih.toISOString().split('T')[0];

                                    tarih.setDate(tarih.getDate() + 90)
                                    let yeniTarihStr5 = tarih.toISOString().split('T')[0];

                                    tarih.setDate(tarih.getDate() + 180)
                                    let yeniTarihStr6 = tarih.toISOString().split('T')[0];

                                    tarih.setDate(tarih.getDate() + 180)
                                    let yeniTarihStr7 = tarih.toISOString().split('T')[0];

                                    tarih.setDate(tarih.getDate() + 365)
                                    let yeniTarihStr8 = tarih.toISOString().split('T')[0];

                                    hesaplaPop.innerHTML = `<h3>${secilenAltBaslik} Hesaplaması Sonuçları</h3>
                                    <div><b>Girilen Tarih: </b>${tarihStr}</div>
                                    <div><b>${tarihStr}(Doğumda): </b>Hepatit-B 1. Aşı</div>
                                    <div><b>${yeniTarihStr}(2.Ay Sonunda):</b> BCG 1. Aşı, DaBT-İPA-Hib-HepB 1. Aşı, KPA 1. Aşı</div>
                                    <div><b>${yeniTarihStr2}(4.Ay Sonunda):</b> DaBT-İPA-Hib-HepB 2. Aşı, KPA 2. Aşı</div>
                                    <div><b>${yeniTarihStr3}(6.Ay Sonunda):</b> DaBT-İPA-Hib-HepB 3. Aşı, OPA 1. Aşı</div>
                                    <div><b>${yeniTarihStr4}(9.Ay Sonunda):</b> KKK Ek Doz</div>
                                    <div><b>${yeniTarihStr5}(12.Ay Sonunda):</b> KPA Pekiştirme Aşısı, KKK 1. Aşı, Su Çiçeği Aşısı</div>
                                    <div><b>${yeniTarihStr6}(18.Ay Sonunda):</b> KPA Pekiştirme Aşısı, KKK 1. Aşı, Su Çiçeği Aşısı</div>
                                    <div><b>${yeniTarihStr7}(24.Ay Sonunda):</b> KPA Pekiştirme Aşısı, KKK 1. Aşı, Su Çiçeği Aşısı</div>
                                    <div><b>${yeniTarihStr8}(48.Ay Sonunda):</b> KPA Pekiştirme Aşısı, KKK 1. Aşı, Su Çiçeği Aşısı</div>
                                    `
                                })
                            } else if (secilenAltBaslik == "Günlük Su İhtiyacı Hesaplama Aracı") {
                                hesaplaPop.style = "display:flex;"
                                hesaplaPop.innerHTML = `<h3>${secilenAltBaslik}</h3>
                                                        <form>
                                                            <div style="text-align: start;width: 300px;">
                                                                    <div style="padding-left: 50px; margin-bottom:10px;"><b>Kilonuz: </b><input type="text" name="" id="kiloGiris" style="width:54%"></div>
                                                                    <div><b>Aktivite Biçimi:</b>
                                                                        <select id="efor" style="width:50%">
                                                                            <option value="0.025">Masa başı bir işte çalışıyorum, fazla hareket etmiyorum</option>
                                                                            <option value="0.026">Az hareket ettiğim bir iş yapıyorum, hafif egzersizler yapıyorum</option>
                                                                            <option value="0.027">Orta derecede hareket gerektiren bir iş yapıyorum</option>
                                                                            <option value="0.028">Çok aktif olduğum bir iş yapıyorum, her gün spor yapıyorum</option>
                                                                            <option value="0.029">Aşırı düzeyde spor yapıyorum, spor müsabakasına hazırlanıyorum</option>
                                                                        </select>
                                                                    </div>
                                                            </div>
                                                                <div id="radioChange" style="display: flex;flex-direction: column;row-gap: 10px;">
                                                                    <div><b>Kadın</b><input type="radio" name="cinsiyet" id="kadin" value="kadin"></div>
                                                                    <div><b>Erkek</b><input type="radio" name="cinsiyet" id="erkek" value="erkek"></div>
                                                                </div><br>
                                                                <div style="margin-left:20px;"><input type="submit" value="Hesapla" id="suIhtiyaciHesapla" style="height:50px;"></div>
                                                        </form>
                                                            `
                                document.querySelector('#suIhtiyaciHesapla').addEventListener("click", function (e) {
                                    e.preventDefault();

                                    const kilo = parseFloat(document.querySelector('#kiloGiris').value);
                                    const cinsiyet = document.querySelector('input[name="cinsiyet"]:checked');
                                    const efor = document.querySelector('#efor').value;

                                    if (!kilo || !cinsiyet) {
                                        alert("Lütfen kilo ve cinsiyet bilgilerinizi girin.");
                                        return;
                                    }
                                    let katsayi;
                                    // Kadın ve erkek için farklı katsayılarla çarp
                                    if (cinsiyet.value === "kadin") {
                                        katsayi = parseFloat(efor); // kadınlar için doğrudan efor değeri
                                    } else if (cinsiyet.value === "erkek") {
                                        // erkekler için efor katsayısına +0.005 ekle
                                        katsayi = parseFloat(efor) + 0.005;
                                    }
                                    const suIhtiyaci = kilo * katsayi * 1000; // sonuç ml cinsinden

                                    hesaplaPop.innerHTML = `<h3 style="margin-top:-6px;">${secilenAltBaslik} Sonuçları</h3>
                                    <div style="margin-bottom:5px;"><b>Günlük Su İhtiyacınız: </b> ${Math.round(suIhtiyaci)} ml.dir</div>
                                    <div><b>Kaç Bardak: </b> ${Math.round(suIhtiyaci) / 250} Bardak(250ml'lik)</div>
                                    <div><b>NOT: </b>Burada belirtilen günlük su ihtiyacınızın bir kısmını yemeklerden alıyorsunuz. Bu nedenle burada belirtilenden daha az miktarda su içmeniz yeterli olacaktır.</div>
                                    <div><b>Uyandıktan Sonra: </b>2 bardak su içmek iç organlarınızı aktifleştirerek güne hazırlar.</div>
                                    <div><b>Yemekten 30 Dakika Önce: </b>1 bardak su içmek hem sindirim sisteminizi harekete geçirir hem de yemeklerde daha az kalori tüketerek kilo vermenizi sağlar.</div>
                                    <div><b>Banyodan Önce: </b>1 bardak su içmek kan basıncınızı düşürmeye yardımcı olur.</div>
                                    <div><b>Uyumadan Önce: </b>1 bardak su içmek ise kalp krizi ve inme riskini azaltır.</div>
                                    `
                                })
                            } else if (secilenAltBaslik == "Sigara Maliyeti Hesaplama Aracı") {
                                hesaplaPop.style = "display:flex;"
                                hesaplaPop.innerHTML = `
                                                        <div>
                                                            <h3>${secilenAltBaslik}</h3>
                                                            <form style="flex-direction:column;row-gap: 12px;">
                                                                <div>
                                                                    <div style="margin-top: 7px;">
                                                                        <b>Hesaplama Şeklini Seçiniz</b>
                                                                        <div><b>Günlük içilen sigara adedi (dal) ile</b><input type="radio" name="sigara" id="dal" value="dal"></div>
                                                                        <div><b>Günlük içilen paket miktarı ile</b><input type="radio" name="sigara" id="paket" value="paket"></div>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <b>Başlama Tarihi:</b>
                                                                    <input type="date" name="" id="ayYilGun">
                                                                </div>
                                                                <div id="dalDiv" style="display: none;">
                                                                    <b>Günlük Dal Adeti</b>
                                                                    <input type="text" name="" id="dalAdet">
                                                                </div>
                                                                <div id="paketDiv" style="display: none;">
                                                                    <b>Günlük Paket Adeti:</b>
                                                                    <select name="" id="paketAdet">
                                                                        <option value="0.5">Yarım Paket</option>
                                                                        <option value="1">1 Paket</option>
                                                                        <option value="1.5">1,5 Paket</option>
                                                                        <option value="2">2 Paket</option>
                                                                        <option value="2.5">2,5 Paket</option>
                                                                        <option value="3">3 Paket</option>
                                                                        <option value="3.5">3,5 Paket</option>
                                                                        <option value="4">4 Paket</option>
                                                                        <option value="4.5">4,5 Paket</option>
                                                                        <option value="5">5 Paket</option>
                                                                        <option value="5.5">5,5 Paket</option>
                                                                        <option value="6">6 Paket</option>
                                                                    </select>
                                                                </div>
                                                                <div>
                                                                    <b>Güncel Paket Fiyatı:</b>
                                                                    <input type="text" name="" id="fiyat">
                                                                </div>
                                                                <div style="margin-left:20px;"><input type="submit" value="Hesapla" id="sigaraMaliyetHesapla" style="height:50px;"></div>
                                                            </form>
                                                        </div>
                                                        `

                                let dal = document.querySelector('#dal')
                                let paket = document.querySelector('#paket')
                                let dalDiv = document.querySelector('#dalDiv')
                                let paketDiv = document.querySelector('#paketDiv')
                                let ayYilGun = document.querySelector('#ayYilGun')
                                let dalAdet = document.querySelector('#dalAdet')
                                let paketAdet = document.querySelector('#paketAdet')
                                let fiyat = document.querySelector('#fiyat')
                                let sigaraMaliyetHesapla = document.querySelector('#sigaraMaliyetHesapla')

                                // Radio Check
                                function radioSelect() {
                                    if (dal.checked) {
                                        dalDiv.style.display = "flex";
                                        paketDiv.style.display = "none";
                                    } else if (paket.checked) {
                                        dalDiv.style.display = "none";
                                        paketDiv.style.display = "flex";
                                    }
                                }
                                dal.addEventListener("change", radioSelect);
                                paket.addEventListener("change", radioSelect);

                                sigaraMaliyetHesapla.addEventListener('click', function (event) {
                                    event.preventDefault()

                                    // Hesaplanacak alanlardaki veriler değişkenlere atandı.
                                    let hesaplanacakTarih = new Date(ayYilGun.value)
                                    let bugun = new Date()

                                    // Saatler önemli olamadığı için sıfırlanıyor.
                                    hesaplanacakTarih.setHours(0, 0, 0, 0)
                                    bugun.setHours(0, 0, 0, 0)

                                    // Önce ms olarak fark bulunup sonra güne çevrildi.
                                    let farkMs = bugun - hesaplanacakTarih
                                    let farkGun = Math.round(farkMs / (1000 * 60 * 60 * 24))

                                    let toplamDal = farkGun * dalAdet.value
                                    let toplamPaket = toplamDal / 20
                                    let toplamMaliyet = toplamPaket * fiyat.value

                                    // Zaman Hesapları
                                    let kayıpZaman = toplamDal * 11
                                    let gunHesabı = kayıpZaman / 1440
                                    let saatHesabı = (kayıpZaman % 1440) / 60
                                    let dakikaHesabı = kayıpZaman % 60

                                    let paketDal = (paketAdet.value * 20) * farkGun
                                    let paketP = ((paketAdet.value * 20) * farkGun) / 20
                                    let toplamPaketM = paketP * fiyat.value

                                    let kayipZamanP = paketDal * 11
                                    let gunHesabıP = kayipZamanP / 1440
                                    let saatHesabıP = (kayipZamanP % 1440) / 60
                                    let dakikaHesabıP = kayipZamanP % 60
                                    if (dal.checked && fiyat.value !== '' && dalAdet.value !== '') {
                                        hesaplaPop.innerHTML = `
                                        <div style="margin: 0px 10px;display: flex;flex-direction: column;row-gap: 5px;">
                                        <h3>${secilenAltBaslik} Sonucu</h3>
                                            <div><b>İçilen Toplam Sigara:</b> ${toplamDal} adet (${toplamPaket} paket)<br></div>
                                            <div><b>Sigaraya Harcanan Toplam Para:</b> ${toplamMaliyet} TL<br></div>
                                            <div><b>Yaşam Süresine Etkisi:</b> Yapılan araştırmalara göre içilen her 1 adet (dal) sigara insan ömrünü ortalama olarak 11 dakika kısaltmaktadır. Buna göre ${toplamPaket} paket sigara içen bir kişinin ömrü ortalama olarak ${kayıpZaman} dakika (${Math.floor(gunHesabı)} gün, ${Math.floor(saatHesabı)} saat, ${dakikaHesabı} dakika) kısalmıştır.<br></div>
                                            <div><b>Sigara Sağlığa Zararlıdır!</b> Sigarayı bırakmak için Sağlık Bakanlığı'nın ALO 171 Sigara Bırakma Danışma Hattı'nı hemen arayabilirsiniz.<br></div>
                                        </div>
                                        `
                                    } else if (paket.checked && fiyat.value !== '' && paketAdet.value !== '') {
                                        hesaplaPop.innerHTML = `
                                        <div style="margin: 0px 10px;display: flex;flex-direction: column;row-gap: 5px;">
                                        <h3>${secilenAltBaslik} Sonucu</h3>
                                            <div><b>İçilen Toplam Sigara:</b> ${paketDal} adet (${paketP} paket)<br></div>
                                            <div><b>Sigaraya Harcanan Toplam Para:</b> ${toplamPaketM} TL<br></div>
                                            <div><b>Yaşam Süresine Etkisi:</b> Yapılan araştırmalara göre içilen her 1 adet (dal) sigara insan ömrünü ortalama olarak 11 dakika kısaltmaktadır. Buna göre ${paketP} paket sigara içen bir kişinin ömrü ortalama olarak ${kayipZamanP} dakika (${Math.floor(gunHesabıP)} gün, ${Math.floor(saatHesabıP)} saat, ${dakikaHesabıP} dakika) kısalmıştır.<br></div>
                                            <div><b>Sigara Sağlığa Zararlıdır!</b> Sigarayı bırakmak için Sağlık Bakanlığı'nın ALO 171 Sigara Bırakma Danışma Hattı'nı hemen arayabilirsiniz.<br></div>
                                        </div>
                                        `
                                    } else {
                                        alert('Tüm alanların dolu olduğuna emin olunuz.')
                                    }
                                })
                            } else if (secilenAltBaslik == "Alan Hesaplama Aracı") {
                                hesaplaPop.style = "display:flex;"
                                hesaplaPop.innerHTML = `
                                                <div>
                                                    <h3>${secilenAltBaslik}</h3>
                                                    <form style="flex-direction:column; row-gap:10px;">
                                                        <div style="display: flex;flex-direction: row;column-gap: 5px;" id="sekillerDiv">
                                                            <b>Şekil: </b>
                                                            <div style="display: flex;align-items: center;"><label for="kare">Dikdörtgen(Kare)</label><input type="radio" name="sekil" id="kare"></div>
                                                            <div style="display: flex;align-items: center;"><label for="ucgen">Üçgen</label><input type="radio" name="sekil" id="ucgen"></div>
                                                            <div style="display: flex;align-items: center;"><label for="daire">Daire(Çember)</label><input type="radio" name="sekil" id="daire"></div>
                                                        </div>
                                                        <div id="boxDiv" style="width: 400px;margin-right: 27px;">
                                                            <div>
                                                                <b>Taban (a):</b><input type="text" name="" id="taban" style="margin-left: 27px;">
                                                            </div>
                                                            <div>
                                                                <b>Yükseklik (h):</b><input type="text" name="" id="yukseklik">
                                                            </div>
                                                        </div>
                                                        <div id="capDiv" style="display: none;">
                                                            <b>Yarıçap (r):</b><input type="text" name="" id="yaricap">
                                                        </div>
                                                        <input type="submit" value="Hesapla" id="alanHesapla">
                                                    </form>
                                                </div >
                                                `
                                let kare = document.querySelector('#kare')
                                let ucgen = document.querySelector('#ucgen')
                                let daire = document.querySelector('#daire')
                                let boxDiv = document.querySelector('#boxDiv')
                                let capDiv = document.querySelector('#capDiv')
                                let taban = document.querySelector('#taban')
                                let yukseklik = document.querySelector('#yukseklik')
                                let yaricap = document.querySelector('#yaricap')
                                let alanHesapla = document.querySelector('#alanHesapla')

                                function sekilRadioCheck() {
                                    if (kare.checked || ucgen.checked) {
                                        boxDiv.style.display = "flex";
                                        capDiv.style.display = "none";
                                    } else if (daire.checked) {
                                        boxDiv.style.display = "none";
                                        capDiv.style.display = "flex";
                                    }
                                }
                                kare.addEventListener("change", sekilRadioCheck);
                                ucgen.addEventListener("change", sekilRadioCheck);
                                daire.addEventListener("change", sekilRadioCheck);

                                if (kare.checked) {
                                    boxDiv.style = "display:flex;"
                                    capDiv.style = "display:none;"
                                } else if (ucgen.checked) {
                                    boxDiv.style = "display:flex;"
                                    capDiv.style = "display:none;"
                                } else if (daire.checked) {
                                    boxDiv.style = "display:none;"
                                    capDiv.style = "display:flex;"
                                }

                                alanHesapla.addEventListener('click', function (event) {
                                    event.preventDefault()

                                    if (kare.checked) {
                                        let kareSonuccm = taban.value * yukseklik.value
                                        let kareSonucm = (taban.value * yukseklik.value) / 10000

                                        hesaplaPop.innerHTML = `<h3>${secilenAltBaslik} Sonuçları</h3>
                                        ${kareSonucm} metrekaredir = ${kareSonuccm}santimetrekare

                                        `
                                    } else if (ucgen.checked) {
                                        let ucgenSonuccm = ((taban.value * yukseklik.value) / 2) / 10000
                                        let ucgenSonucm = (taban.value * yukseklik.value) / 2
                                        hesaplaPop.innerHTML = `<h3>${secilenAltBaslik} Sonuçları</h3>
                                        ${ucgenSonuccm} metrekaredir = ${ucgenSonucm}santimetrekare
                                        `
                                    } else if (daire.checked) {
                                        let pi = 3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679
                                        let daireSonuccm = (yaricap.value * yaricap.value) * pi
                                        let daireSonucm = (pi * (yaricap.value * yaricap.value)) / 10000
                                        hesaplaPop.innerHTML = `<h3>${secilenAltBaslik} Sonuçları</h3>
                                        ${daireSonucm} metrekaredir = ${daireSonuccm}santimetrekare
                                        `
                                    } else if (taban.value == '' || yukseklik.value == '' || yaricap.value == '') {
                                        alert('Tüm alanlar dolu olmalı.')
                                    }
                                })
                            }


                            else if (secilenAltBaslik == "İnç Hesaplama Aracı") {
                                hesaplaPop.style = "display:flex;"
                                hesaplaPop.innerHTML = `
                                                    <form style="flex-direction:column; row-gap:10px;">
                                                        <div style="display:flex; column-gap:10px;">
                                                            <b>İşlem: </b>
                                                            <div id=radioBox>
                                                                <div style="display:flex; align-items:center; margin-bottom:5px;"><label for="incDeger">İnç kaç cm</label><input type="radio" name="deger" id="incDeger"></div>
                                                                <div style="display:flex; align-items:center;"><label for="cmDeger">Cm kaç inç</label><input type="radio" name="deger" id="cmDeger"></div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <b>Uzunluk: </b>
                                                            <input type="text" name="" id="uzunluk">
                                                        </div>
                                                        <input type="submit" value="Hesapla" id="incCmHesapla">
                                                    </form>
                                                        `
                                let incDeger = document.querySelector('#incDeger')
                                let cmDeger = document.querySelector('#cmDeger')
                                let uzunluk = document.querySelector('#uzunluk')
                                let incCmHesapla = document.querySelector('#incCmHesapla')
                                let radioBox = document.querySelector('#radioBox')

                                incCmHesapla.addEventListener('click', function (event) {
                                    event.preventDefault()

                                    if (radioBox.value !== '' && uzunluk.value !== '') {
                                        if (incDeger.checked) {
                                            let deger = uzunluk.value * 2.54
                                            hesaplaPop.innerHTML = `${deger}`
                                        } else if (cmDeger.checked) {
                                            let deger = uzunluk.value * 0.3937
                                            hesaplaPop.innerHTML = `${deger}`
                                        }
                                    }
                                })
                            } else if (secilenAltBaslik == "Çevre Hesaplama Aracı") {
                                hesaplaPop.style = "display:flex;"
                                hesaplaPop.innerHTML = `
                                                    <form style="display:flex; flex-direction:column; row-gap:15px;">
                                                    <h3>${secilenAltBaslik}</h3>
                                                        <div style="display: flex;flex-direction:column; row-gap:10px; width: 370px;">
                                                            <div style="text-align: end; padding-right: 4px;">
                                                                <b>Şekil: </b>
                                                                <select name="" id="sekilGeo">
                                                                    <option value="es">Eşkenar Üçgen</option>
                                                                    <option value="ikiz">İkizkenar Üçgen</option>
                                                                    <option value="esdort">Eşkenar Dörtgen</option>
                                                                    <option value="duzBes">Düzgün(Eşkenar) Beşgen</option>
                                                                    <option value="duzAlt">Düzgün(Eşkenar) Altıgen</option>
                                                                </select>
                                                            </div>
                                                            <div id="kenarBaslik">
                                                                <b id="birKenarA">Bir Kenarın Uzunluğu (a): </b>
                                                                <b id="ikizKenarB" style="display:none;">İkiz Kenar Uzunluğu (a): </b>
                                                                <input type="text" name="" id="birKenar">
                                                            </div>
                                                            <div id="tabanB" style="display:none;justify-content: end; padding-right: 4px;">
                                                                <b>Taban Genişliği (b): </b>
                                                                <input type="text" name="" id="ikiKenar">
                                                            </div>
                                                        </div>
                                                        <div><input type="submit" value="Hesapla" id="cevreHesapla" style="width:177px;"></div>
                                                    </form>
                                                    `
                                let sekilGeo = document.querySelector('#sekilGeo')
                                let tabanB = document.querySelector('#tabanB')
                                let birKenar = document.querySelector('#birKenar')
                                let ikiKenar = document.querySelector('#ikiKenar')
                                let cevreHesapla = document.querySelector('#cevreHesapla')
                                let birKenarA = document.querySelector('#birKenarA')
                                let ikizKenarB = document.querySelector('#ikizKenarB')
                                let kenarBaslik = document.querySelector('#kenarBaslik')
                                sekilGeo.addEventListener("change", function () {
                                    event.preventDefault()
                                    let geoSekil = sekilGeo.value;
                                    if (geoSekil == 'ikiz') {
                                        kenarBaslik.style = "display: flex;justify-content: end;padding-right: 4px;"
                                        tabanB.style = "display:flex;justify-content: end; padding-right: 4px;"
                                        ikizKenarB.style = "display:flex;"
                                        birKenarA.style = "display:none"
                                    } else if (geoSekil !== 'ikiz') {
                                        kenarBaslik.style = "display: flex;justify-content: end;padding-right: 4px;"
                                        tabanB.style = "display:none;"
                                        ikizKenarB.style = "display:none;"
                                        birKenarA.style = "display:flex;"
                                    }
                                })
                                cevreHesapla.addEventListener('click', function (event) {
                                    event.preventDefault()
                                    if (sekilGeo.value == '' || birKenar.value == '') {
                                        alert('Tüm alanların dolu olması gerekiyor.')
                                    } else {
                                        if (sekilGeo.value == 'es') {
                                            hesaplaPop.innerHTML = `<h3>${secilenAltBaslik} Sonuçları</h3>
                                            <div><b>Hesaplamak İstediğiniz Eşkenar Üçgenin Çevresi: </b>${birKenar.value * birKenar.value} cm'dir</div>`
                                        }
                                        else if (sekilGeo.value == 'ikiz' || ikiKenar.value !== '') {
                                            hesaplaPop.innerHTML = `<h3>${secilenAltBaslik} Sonuçları</h3>
                                            <div><b>Hesaplamak İstediğiniz İkizkenar Üçgenin Çevresi: </b>${(parseFloat(birKenar.value) + parseFloat(birKenar.value) + parseFloat(ikiKenar.value))} cm'dir</div>`
                                        }
                                        else if (sekilGeo.value == 'esdort') {
                                            hesaplaPop.innerHTML = `<h3>${secilenAltBaslik} Sonuçları</h3>
                                            <div><b>Hesaplamak İstediğiniz Eşkenar Dikdörtgenin Çevresi: </b>${birKenar.value * 4} cm'dir</div>`
                                        }
                                        else if (sekilGeo.value == 'duzBes') {
                                            hesaplaPop.innerHTML = `<h3>${secilenAltBaslik} Sonuçları</h3>
                                            <div><b>Hesaplamak İstediğiniz Düzgün (Eşkenar) Beşgenin Çevresi: </b>${birKenar.value * 5} cm'dir<7div>`
                                        }
                                        else if (sekilGeo.value == 'duzAlt') {
                                            hesaplaPop.innerHTML = `<h3>${secilenAltBaslik} Sonuçları</h3>
                                            <div><b>Hesaplamak İstediğiniz Düzgün (Eşkenar) Altıgenin Çevresi: </b>${birKenar.value * 6} cm'dir</div>`
                                        } else {
                                            alert('Hata oluştu')
                                        }
                                    }
                                })
                            } else if (secilenAltBaslik == "Mil Hesaplama Aracı") {
                                hesaplaPop.style = "display:flex;"
                                hesaplaPop.innerHTML = `
                                <form style="flex-direction:column; row-gap:10px;">
                                <h3>${secilenAltBaslik}</h3>
                                    <div style="display:flex; column-gap:10px;">
                                        <b>İşlem: </b>
                                        <div id=radioDeger>
                                            <div style="display:flex; align-items:center; margin-bottom:5px;"><label for="milDeger">Mil kaç km</label><input type="radio" name="milKm" id="milDeger"></div>
                                            <div style="display:flex; align-items:center;"><label for="kmDeger">Km kaç mil</label><input type="radio" name="milKm" id="kmDeger"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <b>Uzunluk: </b>
                                        <input type="text" name="" id="uzunlukM">
                                    </div>
                                    <input type="submit" value="Hesapla" id="milKmHesapla">
                                </form>
                                    `
                                let milDeger = document.querySelector('#milDeger')
                                let kmDeger = document.querySelector('#kmDeger')
                                let uzunlukM = document.querySelector('#uzunlukM')
                                let milKmHesapla = document.querySelector('#milKmHesapla')
                                let radioDeger = document.querySelector('#radioDeger')

                                milKmHesapla.addEventListener('click', function (event) {
                                    event.preventDefault()

                                    if (radioDeger.value !== '' && uzunlukM.value !== '') {
                                        if (milDeger.checked) {
                                            let deger = uzunlukM.value * 1.609
                                            hesaplaPop.innerHTML = `
                                            <h3>${secilenAltBaslik} Sonuçları</h3>
                                            ${uzunlukM.value} mil ${deger} kilometre'dir`
                                        } else if (kmDeger.checked) {
                                            let deger = uzunlukM.value * 0.621
                                            hesaplaPop.innerHTML = `
                                            <h3>${secilenAltBaslik} Sonuçları</h3>
                                            ${uzunlukM.value} km ${deger} mil'dir`
                                        }
                                    }
                                })
                            } else if (secilenAltBaslik == "Yüzde Hesaplama Aracı") {
                                hesaplaPop.style = "display:flex;"
                                hesaplaPop.innerHTML = `
                                                        <form style="flex-direction: column; row-gap:10px;">
                                                        <h3>${secilenAltBaslik}</h3>
                                                            <div style="display: flex;margin-left: 20px;">
                                                                <b>İşlem: </b>
                                                                <select name="" id="yuzdeSecim" style="text-align: center;">
                                                                    <option value="">Seçiniz</option><hr>
                                                                    <option value="A">A sayısının %B'si kaçtır?</option><hr>
                                                                    <option value="B">A sayısı, B sayısının yüzde kaçıdır?</option><hr>
                                                                    <option value="C">A sayısından B sayısına değişim oranı yüzde kaçtır?</option><hr>
                                                                    <option value="D">A sayısı, %B kadar artırılırsa kaç olur?</option><hr>
                                                                    <option value="E">A sayısı, %B kadar azaltılırsa kaç olur?</option>
                                                                </select>
                                                            </div>
                                                            <div><b>A Sayısı: </b><input type="text" name="" id="aSayisi"></div>
                                                            <div><b>B Sayısı: </b><input type="text" name="" id="bSayisi"></div>
                                                            <div><input type="submit" value="Hesapla" id="yuzdeHesapla"></div>
                                                        </form>
                                                        `
                                let yuzdeSecim = document.querySelector('#yuzdeSecim')
                                let aSayisi = document.querySelector('#aSayisi')
                                let bSayisi = document.querySelector('#bSayisi')
                                let yuzdeHesapla = document.querySelector('#yuzdeHesapla')
                                yuzdeSecim.addEventListener("change", function () {
                                    event.preventDefault()
                                    let yuzdeSec = yuzdeSecim.value;
                                })
                                yuzdeHesapla.addEventListener('click', function (event) {
                                    event.preventDefault()
                                    if (yuzdeSecim.value == '' || aSayisi.value == '' || bSayisi.value == '') {
                                        alert('Tüm alanların dolu olması gerek.')
                                    } else {
                                        if (yuzdeSecim.value == 'A') {
                                            let aSonuc = (aSayisi.value / 100) * bSayisi.value
                                            let selectedText = yuzdeSecim.options[yuzdeSecim.selectedIndex].text;
                                            hesaplaPop.innerHTML = `<h3>${secilenAltBaslik} Sonuçları</h3>
                                            <div style="background-color: #2D3940;color: #fff;margin-bottom: 20px; padding:5px 5px;border-radius: 4px;"><b>${selectedText}<b/></div>
                                            <div>${aSayisi.value} sayısının %${bSayisi.value} oranı : ${aSonuc}</div>
                                            `
                                        } else if (yuzdeSecim.value == 'B') {
                                            let aSonuc = (aSayisi.value / bSayisi.value) * 100
                                            let selectedText = yuzdeSecim.options[yuzdeSecim.selectedIndex].text;
                                            hesaplaPop.innerHTML = `<h3>${secilenAltBaslik} Sonuçları</h3>
                                            <div style="background-color: #2D3940;color: #fff;margin-bottom: 20px; padding:5px 5px;border-radius: 4px;"><b>${selectedText}<b/></div>
                                            <div>${aSayisi.value} sayısı ${bSayisi.value} sayısının : %${aSonuc} oranıdır</div>
                                            `
                                        } else if (yuzdeSecim.value == 'C') {
                                            let aSonuc = ((bSayisi.value - aSayisi.value) / aSayisi.value * 100)
                                            let selectedText = yuzdeSecim.options[yuzdeSecim.selectedIndex].text;
                                            hesaplaPop.innerHTML = `<h3>${secilenAltBaslik} Sonuçları</h3>
                                            <div style="background-color: #2D3940;color: #fff;margin-bottom: 20px; padding:5px 5px;border-radius: 4px;"><b>${selectedText}<b/></div>
                                            <div>${aSayisi.value} sayısından ${bSayisi.value} sayısına değişim : %${aSonuc} oranındadır</div>
                                            `
                                        } else if (yuzdeSecim.value == 'D') {
                                            let aSonuc = aSayisi.value * (1 + (bSayisi.value / 100))
                                            let selectedText = yuzdeSecim.options[yuzdeSecim.selectedIndex].text;
                                            hesaplaPop.innerHTML = `<h3>${secilenAltBaslik} Sonuçları</h3>
                                            <div style="background-color: #2D3940;color: #fff;margin-bottom: 20px; padding:5px 5px;border-radius: 4px;"><b>${selectedText}<b/></div>
                                            <div>${aSayisi.value} sayısı %${bSayisi.value} arttırılırsa : ${aSonuc} olur</div>
                                            `
                                        } else if (yuzdeSecim.value == 'E') {
                                            let aSonuc = aSayisi.value * (1 - (bSayisi.value / 100))
                                            let selectedText = yuzdeSecim.options[yuzdeSecim.selectedIndex].text;
                                            hesaplaPop.innerHTML = `<h3>${secilenAltBaslik} Sonuçları</h3>
                                            <div style="background-color: #2D3940;color: #fff;margin-bottom: 20px; padding:5px 5px;border-radius: 4px;"><b>${selectedText}<b/></div>
                                            <div>${aSayisi.value} sayısı %${bSayisi.value} azaltılırsa : ${aSonuc} olur</div>
                                            `
                                        }
                                    }
                                })
                            } else if (secilenAltBaslik == "İhbar Tazminatı Hesaplama Aracı") {
                                hesaplaPop.style = "display:flex;"
                                hesaplaPop.innerHTML = `
                                                        <form style="flex-direction: column; row-gap:10px;">
                                                            <h3>${secilenAltBaslik}</h3>
                                                            <div style="background-color: #2D3940;color: #fff;margin-bottom: 20px; padding:5px 5px;border-radius: 4px;"><b>NOT:</b>İşten ayrılma tarihindeki aylık brüt maaşı giriniz.</div>
                                                            <div><b>İşe Başlama Tarihi: </b><input type="date" name="" id="girisTarih"></div>
                                                            <div><b>İşten Ayrılma Tarihi: </b><input type="date" name="" id="cikisTarih"></div>
                                                            <div><b>Aylık Brüt Maaş: </b><input type="text" name="" id="brutMaas"></div>
                                                            <input type="submit" value="Hesapla" id="ihbarHesapla">
                                                        </form>
                                                        `

                                let girisTarih = document.querySelector('#girisTarih')
                                let cikisTarih = document.querySelector('#cikisTarih')
                                let brutMaas = document.querySelector('#brutMaas')
                                let ihbarHesapla = document.querySelector('#ihbarHesapla')



                                // Önce ms olarak fark bulunup sonra güne çevrildi.
                                let ihbarFarkMs = cikisTarih.value - girisTarih.value
                                let ihbarFarkGun = Math.round(ihbarFarkMs / (1000 * 60 * 60 * 24))


                                ihbarHesapla.addEventListener('click', function (event) {
                                    event.preventDefault()

                                    let girisTarihi = new Date(girisTarih.value)
                                    let cikisTarihi = new Date(cikisTarih.value)

                                    // Saatler önemli olamadığı için sıfırlanıyor.
                                    girisTarihi.setHours(0, 0, 0, 0)
                                    cikisTarihi.setHours(0, 0, 0, 0)

                                    let ihbarFarkMs = cikisTarihi - girisTarihi
                                    let ihbarFarkGun = Math.round(ihbarFarkMs / (1000 * 60 * 60 * 24))

                                    if (ihbarFarkGun < 180) {
                                        let brutİhbar = brutMaas.value * (14 / 30)
                                        let brutVergi = (brutİhbar / 100) * 15
                                        let brutDamga = (brutİhbar / 100) * 0.759
                                        let brutNet = brutİhbar - brutVergi - brutDamga
                                        hesaplaPop.innerHTML = `
                                                        <div>
                                                            <h3>${secilenAltBaslik} Sonuçları</h3>
                                                            <div><b>Hesaplamaya Esas Gün: </b>${ihbarFarkGun}</div>
                                                            <div><b>İhbar Süresi: </b>14 Gün</div>
                                                            <div><b>İhbar Tazminatına Esas Ücret: </b>${brutMaas.value} TL</div>
                                                            <div><b>İhbar Tazminatı (Brüt): </b>${brutİhbar.toFixed(2)}  TL</div>
                                                            <div><b>Gelir Vergisi Kesintisi: </b>${brutVergi.toFixed(2)}  TL</div>
                                                            <div><b>Damga Vergisi Kesintisi (%0,759): </b>${brutDamga.toFixed(2)}  TL</div>
                                                            <div><b>Ödenecek İhbar Tazminatı (Net): </b>${brutNet.toFixed(2)}  TL</div>
                                                        </div>
                                                        `
                                    } else if (ihbarFarkGun >= 181 && ihbarFarkGun < 548) {
                                        let brutİhbar = brutMaas.value * (28 / 30)
                                        let brutVergi = (brutİhbar / 100) * 15
                                        let brutDamga = (brutİhbar / 100) * 0.759
                                        let brutNet = brutİhbar - brutVergi - brutDamga
                                        hesaplaPop.innerHTML = `
                                                        <div>
                                                            <h3>${secilenAltBaslik} Sonuçları</h3>
                                                            <div><b>Hesaplamaya Esas Gün: </b>${ihbarFarkGun}</div>
                                                            <div><b>İhbar Süresi: </b>28 Gün</div>
                                                            <div><b>İhbar Tazminatına Esas Ücret: </b>${brutMaas.value} TL</div>
                                                            <div><b>İhbar Tazminatı (Brüt): </b>${brutİhbar.toFixed(2)} TL</div>
                                                            <div><b>Gelir Vergisi Kesintisi: </b>${brutVergi.toFixed(2)} TL</div>
                                                            <div><b>Damga Vergisi Kesintisi (%0,759): </b>${brutDamga.toFixed(2)} TL</div>
                                                            <div><b>Ödenecek İhbar Tazminatı (Net): </b>${brutNet.toFixed(2)} TL</div>
                                                        </div>
                                                        `
                                    } else if (ihbarFarkGun >= 549 && ihbarFarkGun < 1095) {
                                        let brutİhbar = brutMaas.value * (42 / 30)
                                        let brutVergi = (brutİhbar / 100) * 15
                                        let brutDamga = (brutİhbar / 100) * 0.759
                                        let brutNet = brutİhbar - brutVergi - brutDamga
                                        hesaplaPop.innerHTML = `
                                                        <div>
                                                            <h3>${secilenAltBaslik} Sonuçları</h3>
                                                            <div><b>Hesaplamaya Esas Gün: </b>${ihbarFarkGun}</div>
                                                            <div><b>İhbar Süresi: </b>42 Gün</div>
                                                            <div><b>İhbar Tazminatına Esas Ücret: </b>${brutMaas.value} TL</div>
                                                            <div><b>İhbar Tazminatı (Brüt): </b>${brutİhbar.toFixed(2)}  TL</div>
                                                            <div><b>Gelir Vergisi Kesintisi: </b>${brutVergi.toFixed(2)}  TL</div>
                                                            <div><b>Damga Vergisi Kesintisi (%0,759): </b>${brutDamga.toFixed(2)}  TL</div>
                                                            <div><b>Ödenecek İhbar Tazminatı (Net): </b>${brutNet.toFixed(2)}  TL</div>
                                                        </div>
                                                        `
                                    } else if (ihbarFarkGun >= 1096) {
                                        let brutİhbar = brutMaas.value * (56 / 30)
                                        let brutVergi = (brutİhbar / 100) * 15
                                        let brutDamga = (brutİhbar / 100) * 0.759
                                        let brutNet = brutİhbar - brutVergi - brutDamga
                                        hesaplaPop.innerHTML = `
                                                        <div>
                                                            <h3>${secilenAltBaslik} Sonuçları</h3>
                                                            <div><b>Hesaplamaya Esas Gün: </b>${ihbarFarkGun}</div>
                                                            <div><b>İhbar Süresi: </b>56 Gün</div>
                                                            <div><b>İhbar Tazminatına Esas Ücret: </b>${brutMaas.value} TL</div>
                                                            <div><b>İhbar Tazminatı (Brüt): </b>${brutİhbar.toFixed(2)}  TL</div>
                                                            <div><b>Gelir Vergisi Kesintisi: </b>${brutVergi.toFixed(2)}  TL</div>
                                                            <div><b>Damga Vergisi Kesintisi (%0,759): </b>${brutDamga.toFixed(2)}  TL</div>
                                                            <div><b>Ödenecek İhbar Tazminatı (Net): </b>${brutNet.toFixed(2)}  TL</div>
                                                        </div>
                                                        `
                                    }
                                })
                            }




                            else if (secilenAltBaslik == "İşsizlik Maaşı Hesaplama Aracı") {
                                hesaplaPop.style = "display:flex;"
                                hesaplaPop.innerHTML = `
                                                        <form style="flex-direction:column; row-gap:10px;">
                                                        <h3>${secilenAltBaslik}</h3>
                                                            <div>
                                                                <b>Son 3 Yıl Prim Gün Sayısı:</b>
                                                                <select name="" id="selectGun">
                                                                    <option value="">Seçiniz</option>
                                                                    <option value="0">600 günden az</option>
                                                                    <option value="1">600 - 899 gün arası</option>
                                                                    <option value="2">900 - 1079 gün arası</option>
                                                                    <option value="3">1080 gün (3 yıl kesintisiz çalışma durumunda)</option>
                                                                </select>
                                                            </div>
                                                            <div><b>İşten ayrılmadan önceki son 4 ayda alınan brüt maaşlar:</b></div>
                                                            <div><b>1. Ay Brüt Ücret:</b><input type="text" name="" id="brutMaas1"></div>
                                                            <div><b>2. Ay Brüt Ücret:</b><input type="text" name="" id="brutMaas2"></div>
                                                            <div><b>3. Ay Brüt Ücret:</b><input type="text" name="" id="brutMaas3"></div>
                                                            <div><b>4. Ay Brüt Ücret:</b><input type="text" name="" id="brutMaas4"></div>
                                                            <input type="submit" value="Hesapla" id="issizlikHesapla">
                                                        </form>
                                                        `


                                let selectGun = document.querySelector('#selectGun')
                                let brutMaas1 = document.querySelector('#brutMaas1')
                                let brutMaas2 = document.querySelector('#brutMaas2')
                                let brutMaas3 = document.querySelector('#brutMaas3')
                                let brutMaas4 = document.querySelector('#brutMaas4')
                                let issizlikHesapla = document.querySelector('#issizlikHesapla')

                                issizlikHesapla.addEventListener('click', function (event) {
                                    event.preventDefault()

                                    if (selectGun.value == 0) {
                                        hesaplaPop.innerHTML = `
                                        <div><b>NOT: İşsizlik maaşı alabilmek için hizmet akdinin feshinden önceki son üç yıl içinde en az 600 gün süre (20 ay) ile işsizlik sigortası primi ödemiş olmak gerekmektedir. Bu nedenle maalesef işsizlik maaşı alma hakkınız bulunmamaktadır.</b></div>
                                        `
                                    } else if (selectGun.value == 1) {
                                        let brutOrt = (parseFloat(brutMaas1.value) + parseFloat(brutMaas2.value) + parseFloat(brutMaas3.value) + parseFloat(brutMaas4.value)) / 4
                                        let brutGunluk = brutOrt / 30
                                        let netGunluk = (brutGunluk / 100) * 40
                                        let brutAylik = ((brutGunluk / 100) * 40) * 30
                                        let brutDamgaVergisi = brutAylik * 0.00759
                                        let aylikNet = brutAylik - brutDamgaVergisi
                                        hesaplaPop.innerHTML = `
                                                            <div>
                                                                <h3>${secilenAltBaslik} Sonuçları</h3>
                                                                <div><b>İşsizlik Maaşı Alabileceğiniz Süre: </b>6 Ay</div>
                                                                <div><b>Günlük İşsizlik Ödeneği (Brüt): </b>${netGunluk.toFixed(2)} TL</div>
                                                                <div><b>Aylık İşsizlik Maaşı (Brüt): </b>${brutAylik.toFixed(2)} TL</div>
                                                                <div><b>Damga Vergisi Kesintisi (%0,759): </b>${brutDamgaVergisi.toFixed(2)} TL</div>
                                                                <div><b>Aylık İşsizlik Maaşı (Net): </b>${aylikNet.toFixed(2)} TL</div>
                                                                <div><b>6 Ay Boyunca Alabileceğiniz Toplam İşsizlik Maaşı (Net): </b>${(aylikNet * 6).toFixed(2)} TL</div>
                                                                <div><b>2025 Yılı için En Düşük (Taban) Aylık İşsizlik Maaşı (Brüt): </b>10402,20 TL (Ek bilgidir.)</div>
                                                                <div><b>2025 Yılı için En Yüksek (Tavan) Aylık İşsizlik Maaşı (Brüt): </b>20804,40 TL (Ek bilgidir.)</div>
                                                            </div>
                                                            `
                                    } else if (selectGun.value == 2) {
                                        let brutOrt = (parseFloat(brutMaas1.value) + parseFloat(brutMaas2.value) + parseFloat(brutMaas3.value) + parseFloat(brutMaas4.value)) / 4
                                        let brutGunluk = brutOrt / 30
                                        let netGunluk = (brutGunluk / 100) * 40
                                        let brutAylik = ((brutGunluk / 100) * 40) * 30
                                        let brutDamgaVergisi = brutAylik * 0.00759
                                        let aylikNet = brutAylik - brutDamgaVergisi
                                        hesaplaPop.innerHTML = `
                                                            <div>
                                                                <h3>${secilenAltBaslik} Sonuçları</h3>
                                                                <div><b>İşsizlik Maaşı Alabileceğiniz Süre: </b>8 Ay</div>
                                                                <div><b>Günlük İşsizlik Ödeneği (Brüt): </b>${netGunluk.toFixed(2)} TL</div>
                                                                <div><b>Aylık İşsizlik Maaşı (Brüt): </b>${brutAylik.toFixed(2)} TL</div>
                                                                <div><b>Damga Vergisi Kesintisi (%0,759): </b>${brutDamgaVergisi.toFixed(2)} TL</div>
                                                                <div><b>Aylık İşsizlik Maaşı (Net): </b>${aylikNet.toFixed(2)} TL</div>
                                                                <div><b>6 Ay Boyunca Alabileceğiniz Toplam İşsizlik Maaşı (Net): </b>${(aylikNet * 8).toFixed(2)} TL</div>
                                                                <div><b>2025 Yılı için En Düşük (Taban) Aylık İşsizlik Maaşı (Brüt): </b>10402,20 TL (Ek bilgidir.)</div>
                                                                <div><b>2025 Yılı için En Yüksek (Tavan) Aylık İşsizlik Maaşı (Brüt): </b>20804,40 TL (Ek bilgidir.)</div>
                                                            </div>
                                                            `
                                    } else if (selectGun.value == 3) {
                                        let brutOrt = (parseFloat(brutMaas1.value) + parseFloat(brutMaas2.value) + parseFloat(brutMaas3.value) + parseFloat(brutMaas4.value)) / 4
                                        let brutGunluk = brutOrt / 30
                                        let netGunluk = (brutGunluk / 100) * 40
                                        let brutAylik = ((brutGunluk / 100) * 40) * 30
                                        let brutDamgaVergisi = brutAylik * 0.00759
                                        let aylikNet = brutAylik - brutDamgaVergisi
                                        hesaplaPop.innerHTML = `
                                                            <div>
                                                                <h3>${secilenAltBaslik} Sonuçları</h3>
                                                                <div><b>İşsizlik Maaşı Alabileceğiniz Süre: </b>10 Ay</div>
                                                                <div><b>Günlük İşsizlik Ödeneği (Brüt): </b>${netGunluk.toFixed(2)} TL</div>
                                                                <div><b>Aylık İşsizlik Maaşı (Brüt): </b>${brutAylik.toFixed(2)} TL</div>
                                                                <div><b>Damga Vergisi Kesintisi (%0,759): </b>${brutDamgaVergisi.toFixed(2)} TL</div>
                                                                <div><b>Aylık İşsizlik Maaşı (Net): </b>${aylikNet.toFixed(2)} TL</div>
                                                                <div><b>6 Ay Boyunca Alabileceğiniz Toplam İşsizlik Maaşı (Net): </b>${(aylikNet * 10).toFixed(2)} TL</div>
                                                                <div><b>2025 Yılı için En Düşük (Taban) Aylık İşsizlik Maaşı (Brüt): </b>10402,20 TL (Ek bilgidir.)</div>
                                                                <div><b>2025 Yılı için En Yüksek (Tavan) Aylık İşsizlik Maaşı (Brüt): </b>20804,40 TL (Ek bilgidir.)</div>
                                                            </div>
                                                            `
                                    }
                                })


                            }


                            else if (secilenAltBaslik == "Yıllık İzin Hesaplama Aracı") {
                                hesaplaPop.style = "display:flex;"
                                hesaplaPop.innerHTML = `
                                                        <div>
                                                        <h3>${secilenAltBaslik}</h3>
                                                            <form style="flex-direction: column; row-gap: 10px;;">
                                                                <div id:"calisanRadio" style="display: flex;column-gap: 10px;">
                                                                    <b>Çalışan Türü: </b>
                                                                    <div style="display: flex; align-items: center;">
                                                                        <label for="devletMemuru">Devlet Memuru</label>
                                                                        <input type="radio" name="calisanTur" id="devletMemuru" value="devletMemuru">
                                                                    </div>
                                                                    <div style="display: flex; align-items: center;">
                                                                        <label for="digerCalisan">Diğer</label>
                                                                        <input type="radio" name="calisanTur" id="digerCalisan" value="digerCalisan">
                                                                    </div>
                                                                </div>
                                                                <div id="calisanDogumDiv" style="display: none; align-items: center; column-gap: 35px;"><b>Doğum Tarihi: </b><input type="date" name="" id="calisanDogumT"></div>
                                                                <divstyle="display: flex; align-items: center; column-gap: 3px;"><b>İşe Başlama Tarihi: </b><input type="date" name="" id="calisanGirisT"></div>
                                                                <div style="margin-top:10px;"><input type="submit" value="Hesapla" id="izinSuresiHesapla"></div>
                                                            </form>
                                                        </div>
                                                        `
                                let devletMemuru = document.querySelector('#devletMemuru')
                                let digerCalisan = document.querySelector('#digerCalisan')
                                let calisanDogumT = document.querySelector('#calisanDogumT')
                                let calisanDogumDiv = document.querySelector('#calisanDogumDiv')
                                let calisanGirisT = document.querySelector('#calisanGirisT')
                                let izinSuresiHesapla = document.querySelector('#izinSuresiHesapla')

                                function calisanRadioCheck() {
                                    if (devletMemuru.checked) {
                                        calisanDogumDiv.style.display = "none";
                                    } else if (digerCalisan.checked) {
                                        calisanDogumDiv.style.display = "flex";
                                    }
                                }
                                devletMemuru.addEventListener("change", calisanRadioCheck);
                                digerCalisan.addEventListener("change", calisanRadioCheck);

                                izinSuresiHesapla.addEventListener('click', function (event) {
                                    event.preventDefault()
                                    let dogumT = new Date(calisanDogumT.value)
                                    let girisT = new Date(calisanGirisT.value)
                                    let bugun = new Date()

                                    // Çalışan Yaş Hesabı
                                    let yasMs = bugun - dogumT
                                    let yasSayi = Math.round(yasMs / (1000 * 60 * 60 * 24) / 365)

                                    // Çalışan çalışma süresi
                                    let calismaMs = bugun - girisT

                                    let calismaMn = calismaMs / (1000 * 60)
                                    let calismayil = calismaMn / 525960
                                    let calismaAy = (calismaMn % 525960) / 43200
                                    let calismaGun = ((calismaMn % 525960) % 43200) / 1440

                                    if (digerCalisan.checked && girisT !== '' && dogumT !== '') {
                                        if (Math.round(calismayil < 1)) {
                                            let kalanSure = 31557600000 - calismaMs
                                            let kalanSureGun = kalanSure / 86400000
                                            let yilSonra = girisT.setFullYear(girisT.getFullYear() + 1)

                                            let gun = String(girisT.getDate()).padStart(2, '0');
                                            let ay = String(girisT.getMonth() + 1).padStart(2, '0');
                                            let yil = girisT.getFullYear();
                                            hesaplaPop.innerHTML = `
                                                        <div>
                                                        <h3>${secilenAltBaslik} Sonuçları</h3>
                                                            <div><b>İşyerindeki Kıdem: </b>${Math.round(calismaAy)} Ay ${Math.round(calismaGun)} Gün</div>
                                                            <div><b>Yıllık Ücretli İzin Hakkı: </b>1 yıllık hizmet süresini (kıdem) henüz doldurmadığınız için yıllık ücretli izin hakkınız bulunmamaktadır.</div>
                                                            <div><b>Bir Sonraki Kıdem Artışına Kalan Gün Sayısı: </b>Yeni hizmet yılına gireceğiniz ${gun}.${ay}.${yil} tarihine ${Math.round(kalanSureGun)} gün kaldı.</div>
                                                            <div><b>ÖNEMLİ NOT: </b>${Math.round(calismaAy)} Ay ${Math.round(calismaGun)} gün kıdemi bulunan bir çalışan ${Math.round(calismaAy + 1)}.  hizmet yılında sayılmaktadır.</div>
                                                        </div>
                                                        `
                                        } else if (Math.round(calismayil >= 1 && calismayil <= 5)) {
                                            let kalanSure = 157788000000 - calismaMs
                                            let kalanSureGun = kalanSure / 86400000
                                            let kalanYil = kalanSureGun / 365
                                            let kalanGuns = kalanSureGun % 365
                                            let kalanAy = kalanGuns / 30
                                            let kalan = kalanGuns % 30
                                            let yilSonra = girisT.setFullYear(girisT.getFullYear() + 5)
                                            // 5 yıl 157788000000 ms
                                            let besYilFarkMs = 157788000000 - girisT
                                            let besYilFarkGun = besYilFarkMs / 1440
                                            let gun = String(girisT.getDate()).padStart(2, '0');
                                            let ay = String(girisT.getMonth() + 1).padStart(2, '0');
                                            let yil = girisT.getFullYear();
                                            hesaplaPop.innerHTML = `
                                                        <div>
                                                        <h3>${secilenAltBaslik} Sonuçları</h3>
                                                        <b>Yaşınız: </b>${yasSayi}
                                                            <div><b>İşyerindeki Kıdem: </b>${Math.floor(calismayil)} Yıl ${Math.floor(calismaAy)} Ay ${Math.floor(calismaGun)} Gün</div>
                                                            <div><b>Yıllık Ücretli İzin Hakkı: </b>14 Gün</div>
                                                            <div><b>Bir Sonraki Kıdem Artışına Kalan Gün Sayısı: </b>Yeni hizmet yılına gireceğiniz ${gun}.${ay}.${yil} tarihine ${Math.round(kalanSureGun)} gün kaldı.</div>
                                                            <div><b>ÖNEMLİ NOT: </b>${Math.floor(calismayil)} Yıl ${Math.floor(calismaAy)} Ay ${Math.floor(calismaGun)} gün kıdemi bulunan bir çalışan ${Math.round(calismayil + 1)}.  hizmet yılında sayılmaktadır.</div>
                                                        </div>
                                                        `
                                            // (${Math.floor(kalanYil)} Yıl ${Math.floor(kalanAy)} Ay ${Math.floor(kalan)} Gün) 

                                        } else if (Math.round(calismayil > 5 && calismayil < 15)) {

                                            let kalanSure = 473364000000 - calismaMs
                                            let kalanSureGun = kalanSure / 86400000
                                            let kalanYil = kalanSureGun / 365
                                            let kalanGuns = kalanSureGun % 365
                                            let kalanAy = kalanGuns / 30
                                            let kalan = kalanGuns % 30
                                            let yilSonra = girisT.setFullYear(girisT.getFullYear() + 15)
                                            let besYilFarkMs = 157788000000 - girisT
                                            let besYilFarkGun = besYilFarkMs / 1440
                                            let gun = String(girisT.getDate()).padStart(2, '0');
                                            let ay = String(girisT.getMonth() + 1).padStart(2, '0');
                                            let yil = girisT.getFullYear();
                                            hesaplaPop.innerHTML = `
                                                        <div>
                                                        <h3>${secilenAltBaslik} Sonuçları</h3>
                                                        <b>Yaşınız: </b>${yasSayi}
                                                            <div><b>İşyerindeki Kıdem: </b>${Math.floor(calismayil)} Yıl ${Math.floor(calismaAy)} Ay ${Math.floor(calismaGun)} Gün</div>
                                                            <div><b>Yıllık Ücretli İzin Hakkı: </b>20 Gün</div>
                                                            <div><b>Bir Sonraki Kıdem Artışına Kalan Gün Sayısı: </b>Yeni hizmet yılına gireceğiniz ${gun}.${ay}.${yil} tarihine ${Math.round(kalanSureGun)} gün kaldı.</div>
                                                            <div><b>ÖNEMLİ NOT: </b>${Math.floor(calismayil)} Yıl ${Math.floor(calismaAy)} Ay ${Math.floor(calismaGun)} gün kıdemi bulunan bir çalışan ${Math.floor(calismayil + 1)}.  hizmet yılında sayılmaktadır.</div>
                                                        </div>
                                                        `
                                        } else if (Math.round(calismayil >= 15)) {
                                            let kalanSure = 473364000000 - calismaMs
                                            let kalanSureGun = kalanSure / 86400000
                                            let kalanYil = kalanSureGun / 365
                                            let kalanGuns = kalanSureGun % 365
                                            let kalanAy = kalanGuns / 30
                                            let kalan = kalanGuns % 30
                                            let yilSonra = girisT.setFullYear(girisT.getFullYear() + 16)
                                            let besYilFarkMs = 157788000000 - girisT
                                            let besYilFarkGun = besYilFarkMs / 1440
                                            let gun = String(girisT.getDate()).padStart(2, '0');
                                            let ay = String(girisT.getMonth() + 1).padStart(2, '0');
                                            let yil = girisT.getFullYear();
                                            hesaplaPop.innerHTML = `
                                                        <div>
                                                        <h3>${secilenAltBaslik} Sonuçları</h3>
                                                        <b>Yaşınız: </b>${yasSayi}
                                                            <div><b>İşyerindeki Kıdem: </b>${Math.floor(calismayil)} Yıl ${Math.floor(calismaAy)} Ay ${Math.floor(calismaGun)} Gün</div>
                                                            <div><b>Yıllık Ücretli İzin Hakkı: </b>26 Gün</div>
                                                            <div><b>Bir Sonraki Kıdem Artışına Kalan Gün Sayısı: </b>Yeni hizmet yılında ekstra bir izin hakkınız bulunmayacak. Tavan seviyedesiniz.</div>
                                                            <div><b>ÖNEMLİ NOT: </b>${Math.floor(calismayil)} Yıl ${Math.floor(calismaAy)} Ay ${Math.floor(calismaGun)} gün kıdemi bulunan bir çalışan ${Math.floor(calismayil + 1)}.  hizmet yılında sayılmaktadır.</div>
                                                        </div>
                                                        `
                                        }
                                    } else if (devletMemuru.checked && girisT !== '') {
                                        if (Math.round(calismayil < 1)) {
                                            let kalanSure = 31557600000 - calismaMs
                                            let kalanSureGun = kalanSure / 86400000
                                            let yilSonra = girisT.setFullYear(girisT.getFullYear() + 1)

                                            let gun = String(girisT.getDate()).padStart(2, '0');
                                            let ay = String(girisT.getMonth() + 1).padStart(2, '0');
                                            let yil = girisT.getFullYear();
                                            hesaplaPop.innerHTML = `
                                                        <div>
                                                        <h3>${secilenAltBaslik} Sonuçları</h3>
                                                            <div><b>İşyerindeki Kıdem: </b>${Math.round(calismaAy)} Ay ${Math.round(calismaGun)} Gün</div>
                                                            <div><b>Yıllık Ücretli İzin Hakkı: </b>1 yıllık hizmet süresini (kıdem) henüz doldurmadığınız için yıllık ücretli izin hakkınız bulunmamaktadır.</div>
                                                            <div><b>Bir Sonraki Kıdem Artışına Kalan Gün Sayısı: </b>Yeni hizmet yılına gireceğiniz ${gun}.${ay}.${yil} tarihine ${Math.round(kalanSureGun)} gün kaldı.</div>
                                                            <div><b>ÖNEMLİ NOT: </b>${Math.round(calismaAy)} Ay ${Math.round(calismaGun)} gün kıdemi bulunan bir çalışan ${Math.round(calismaAy + 1)}.  hizmet yılında sayılmaktadır.</div>
                                                        </div>
                                                        `
                                        } else if (Math.round(calismayil > 1 && calismayil <= 10)) {

                                            let kalanSure = 315576000000 - calismaMs
                                            let kalanSureGun = kalanSure / 86400000
                                            let kalanYil = kalanSureGun / 365
                                            let kalanGuns = kalanSureGun % 365
                                            let kalanAy = kalanGuns / 30
                                            let kalan = kalanGuns % 30
                                            let yilSonra = girisT.setFullYear(girisT.getFullYear() + 10)
                                            let besYilFarkMs = 157788000000 - girisT
                                            let besYilFarkGun = besYilFarkMs / 1440
                                            let gun = String(girisT.getDate()).padStart(2, '0');
                                            let ay = String(girisT.getMonth() + 1).padStart(2, '0');
                                            let yil = girisT.getFullYear();
                                            hesaplaPop.innerHTML = `
                                                        <div>
                                                        <h3>${secilenAltBaslik} Sonuçları</h3>
                                                            <div><b>İşyerindeki Kıdem: </b>${Math.floor(calismayil)} Yıl ${Math.floor(calismaAy)} Ay ${Math.floor(calismaGun)} Gün</div>
                                                            <div><b>Yıllık Ücretli İzin Hakkı: </b>20 Gün</div>
                                                            <div><b>Bir Sonraki Kıdem Artışına Kalan Gün Sayısı: </b>Yeni hizmet yılına gireceğiniz ${gun}.${ay}.${yil} tarihine ${Math.round(kalanSureGun)} gün kaldı.</div>
                                                            <div><b>ÖNEMLİ NOT: </b>${Math.floor(calismayil)} Yıl ${Math.floor(calismaAy)} Ay ${Math.floor(calismaGun)} gün kıdemi bulunan bir çalışan ${Math.floor(calismayil + 1)}.  hizmet yılında sayılmaktadır.</div>
                                                        </div>
                                                        `
                                        } else if (Math.round(calismayil > 10)) {

                                            let kalanSure = 315576000000 - calismaMs
                                            let kalanSureGun = kalanSure / 86400000
                                            let kalanYil = kalanSureGun / 365
                                            let kalanGuns = kalanSureGun % 365
                                            let kalanAy = kalanGuns / 30
                                            let kalan = kalanGuns % 30
                                            let yilSonra = girisT.setFullYear(girisT.getFullYear() + 10)
                                            let besYilFarkMs = 157788000000 - girisT
                                            let besYilFarkGun = besYilFarkMs / 1440
                                            let gun = String(girisT.getDate()).padStart(2, '0');
                                            let ay = String(girisT.getMonth() + 1).padStart(2, '0');
                                            let yil = girisT.getFullYear();
                                            hesaplaPop.innerHTML = `
                                                        <div>
                                                        <h3>${secilenAltBaslik} Sonuçları</h3>
                                                            <div><b>İşyerindeki Kıdem: </b>${Math.floor(calismayil)} Yıl ${Math.floor(calismaAy)} Ay ${Math.floor(calismaGun)} Gün</div>
                                                            <div><b>Yıllık Ücretli İzin Hakkı: </b>30 Gün</div>
                                                            <div><b>Bir Sonraki Kıdem Artışına Kalan Gün Sayısı: </b>Yeni hizmet yılında ekstra bir izin hakkınız bulunmayacak. Tavan seviyedesiniz.</div>
                                                            <div><b>ÖNEMLİ NOT: </b>${Math.floor(calismayil)} Yıl ${Math.floor(calismaAy)} Ay ${Math.floor(calismaGun)} gün kıdemi bulunan bir çalışan ${Math.floor(calismayil + 1)}.  hizmet yılında sayılmaktadır.</div>
                                                        </div>
                                                        `
                                        }
                                    } else {
                                        alert('Tüm alanların dolu olduğundan emin olun.')
                                    }
                                })
                            } else if (secilenAltBaslik == "Desi Hesaplama Aracı") {
                                hesaplaPop.style = "display:flex;"
                                hesaplaPop.innerHTML = `
                                                        <div>
                                                            <h3>${secilenAltBaslik}</h3>
                                                            <form style="flex-direction:column; row-gap:10px;">
                                                                <div style="margin-left: 50px;"><b>En: </b><input type="text" name="" id="en"> cm</div>
                                                                <div style="margin-left: 43px;"><b>Boy: </b><input type="text" name="" id="boy"> cm</div>
                                                                <div><b>Yükseklik: </b><input type="text" name="" id="yukseklik"> cm</div>
                                                                <div><input type="submit" value="Hesapla" id="desiHesapla"></div>
                                                            </form>
                                                        </div>
                                                        `
                                let en = document.querySelector('#en')
                                let boy = document.querySelector('#boy')
                                let yukseklik = document.querySelector('#yukseklik')
                                let desiHesapla = document.querySelector('#desiHesapla')

                                desiHesapla.addEventListener('click', function (event) {
                                    event.preventDefault()
                                    desiSonuc = (en.value * boy.value * yukseklik.value) / 3000
                                    if (en.value !== '' && boy.value !== '' && yukseklik.value !== '') {
                                        hesaplaPop.innerHTML = `
                                                            <h3>${secilenAltBaslik} Sonuçları</h3>
                                                            <div><b>${en.value}(cm) x ${boy.value}(cm) x ${yukseklik.value}(cm) Boyutlarındaki Paketin Desisi:</b>${desiSonuc.toFixed(3)} birimdir.</div>
                                                            `
                                    } else {
                                        alert('Lütfen tüm alanların dolu olduğundan emin olunuz.')
                                    }
                                })

                            } else if (secilenAltBaslik == "İndirim Hesaplama Aracı") {
                                hesaplaPop.style = "display:flex;"
                                hesaplaPop.innerHTML = `
                                                    <div>
                                                        <form style="flex-direction: column; row-gap: 10px;">
                                                            <div>
                                                                <b>İşlem: </b>
                                                                <select name="" id="indirimSelect" style="margin-left: 12px; width: 176px;">
                                                                    <option value="">Seçiniz</option>
                                                                    <option value="0">İndirimli fiyat hesaplama</option>
                                                                    <option value="1">Normal fiyat hesaplama</option>
                                                                    <option value="2">İndirim oranı hesaplama</option>
                                                                </select>
                                                            </div>
                                                            <div id="normalD" style=" margin-left: -41px;"><b>Normal Fiyat: </b><input type="text" name="" id="normalF"></div>
                                                            <div id="indirimliD" style="display:none;"><b>İndirimli Fiyat:</b><input type="text" name="" id="indirimliF"></div>
                                                            <div id="oranD" style="margin-right: 78px;"><b>İndirim Oranı (%): </b><input type="text" name="" id="indirimO"></div>
                                                            <div><input type="submit" value="Hesapla" id="indirimHesapla"></div>
                                                        </form>
                                                    </div>
                                                    `

                                let indirimSelect = document.querySelector('#indirimSelect')
                                let normalD = document.querySelector('#normalD')
                                let indirimliD = document.querySelector('#indirimliD')
                                let oranD = document.querySelector('#oranD')
                                let indirimHesapla = document.querySelector('#indirimHesapla')

                                indirimSelect.addEventListener("change", function (event) {
                                    event.preventDefault()
                                    let selectedInd = indirimSelect.value;

                                    if (selectedInd == '0') {
                                        normalD.style = "display:flex;"
                                        indirimliD.style = "display:none;"
                                        oranD.style = "display:flex;"
                                    } else if (selectedInd == '1') {
                                        normalD.style = "display:none;"
                                        indirimliD.style = "display:flex;"
                                        oranD.style = "display:flex;"
                                    }
                                    else if (selectedInd == '2') {
                                        normalD.style = "display:flex;"
                                        indirimliD.style = "display:flex;"
                                        oranD.style = "display:none;"
                                    }
                                })




                            }



                            else if (secilenAltBaslik == "Kâr Hesaplama Aracı") {
                                hesaplaPop.style = "display=flex;"
                                hesaplaPop.innerHTML = '<form><b>Kredi Tutarı24:</b><div><input type="text" name="" id="dmGiris"><input type="submit" value="Hesapla" id="dmHesapla"></div></form>'
                            } else if (secilenAltBaslik == "Zam Hesaplama Aracı") {
                                hesaplaPop.style = "display=flex;"
                                hesaplaPop.innerHTML = '<form><b>Kredi Tutarı25:</b><div><input type="text" name="" id="dmGiris"><input type="submit" value="Hesapla" id="dmHesapla"></div></form>'
                            } else if (secilenAltBaslik == "Zarar Hesaplama Aracı") {
                                hesaplaPop.style = "display=flex;"
                                hesaplaPop.innerHTML = '<form><b>Kredi Tutarı26:</b><div><input type="text" name="" id="dmGiris"><input type="submit" value="Hesapla" id="dmHesapla"></div></form>'
                            } else if (event.target.tagName == 'H2' || secilen) {
                                hesaplaPop.style = "display:none;"
                            }
                        } else {
                            hesaplaPop.style = ""
                        }
                    }
                })


            }
        })
    })



/* 
Yapılacaklar:
üst başlıklara tıklandığında veri girişi yapılan alanlar kapatılacak,
alt başlığa tıklanıldığında açılacak olan formu en başta düzenle!!!
ilgili alt başlığın altında ilgili veri giriş alanları listelenecek ve veri giriş alanlarının id leri doldurulacak.
ilgili alt başlığın altındaki veri giriş alanlarından alınan veriler hesaplatılıp indexs.html e gönderilecek
    Gönderilirken pop-up ile gönderilecek. pop-up ve tüm sayfa css lenecek.
*/