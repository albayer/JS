
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
                            }


                            else if (secilenAltBaslik == "Günlük Su İhtiyacı Hesaplama Aracı") {
                                hesaplaPop.style = "display:flex;"
                                hesaplaPop.innerHTML = `<div>
                                <form>
                                    <div>
                                    <b>Kilonuz: </b><input type="text" name="" id="dmGiris">
                                        <div id="radioChange">
                                            <div><b>Kadın</b><input type="radio" name="cinsiyet" id="kadın" value="kadın"></div>
                                            <div><b>Erkek</b><input type="radio" name="cinsiyet" id="erkek" value="erkek"></div>
                                        </div>
                                        <select name="" id="" style="width:35%">
                                            <option value="">Seçiniz</option>
                                            <option value="az">Masa başı bir işte çalışıyorum, fazla hareket etmiyorum</option>
                                            <option value="biraz">Az hareket ettiğim bir iş yapıyorum, hafif egzersizler yapıyorum</option>
                                            <option value="orta">Orta derecede hareket gerektiren bir iş yapıyorum</option>
                                            <option value="ortaCok">Çok aktif olduğum bir iş yapıyorum, her gün spor yapıyorum</option>
                                            <option value="yuksek">Aşırı düzeyde spor yapıyorum, spor müsabakasına hazırlanıyorum</option>
                                        </select>
                                        <input type="submit" value="Hesapla" id="suİhtiyaciHesapla">
                                    </div>
                                    </div>
                                </form>
                                `

                                
                            }



                            else if (secilenAltBaslik == "Sigara Maliyeti Hesaplama Aracı") {
                                hesaplaPop.style = "display=flex;"
                                hesaplaPop.innerHTML = '<form><b>Kredi Tutarı13:</b><div><input type="text" name="" id="dmGiris"><input type="submit" value="Hesapla" id="dmHesapla"></div></form>'
                            }


                            else if (secilenAltBaslik == "Alan Hesaplama Aracı") {
                                hesaplaPop.style = "display=flex;"
                                hesaplaPop.innerHTML = '<form><b>Kredi Tutarı14:</b><div><input type="text" name="" id="dmGiris"><input type="submit" value="Hesapla" id="dmHesapla"></div></form>'
                            } else if (secilenAltBaslik == "İnç Hesaplama Aracı") {
                                hesaplaPop.style = "display=flex;"
                                hesaplaPop.innerHTML = '<form><b>Kredi Tutarı15:</b><div><input type="text" name="" id="dmGiris"><input type="submit" value="Hesapla" id="dmHesapla"></div></form>'
                            } else if (secilenAltBaslik == "Çevre Hesaplama Aracı") {
                                hesaplaPop.style = "display=flex;"
                                hesaplaPop.innerHTML = '<form><b>Kredi Tutarı16:</b><div><input type="text" name="" id="dmGiris"><input type="submit" value="Hesapla" id="dmHesapla"></div></form>'
                            } else if (secilenAltBaslik == "Mil Hesaplama Aracı") {
                                hesaplaPop.style = "display=flex;"
                                hesaplaPop.innerHTML = '<form><b>Kredi Tutarı17:</b><div><input type="text" name="" id="dmGiris"><input type="submit" value="Hesapla" id="dmHesapla"></div></form>'
                            } else if (secilenAltBaslik == "Yüzde Hesaplama Aracı") {
                                hesaplaPop.style = "display=flex;"
                                hesaplaPop.innerHTML = '<form><b>Kredi Tutarı18:</b><div><input type="text" name="" id="dmGiris"><input type="submit" value="Hesapla" id="dmHesapla"></div></form>'
                            } else if (secilenAltBaslik == "İhbar Tazminatı Hesaplama Aracı") {
                                hesaplaPop.style = "display=flex;"
                                hesaplaPop.innerHTML = '<form><b>Kredi Tutarı19:</b><div><input type="text" name="" id="dmGiris"><input type="submit" value="Hesapla" id="dmHesapla"></div></form>'
                            } else if (secilenAltBaslik == "Maaş Hesaplamaları (Brüt-Net)") {
                                hesaplaPop.style = "display=flex;"
                                hesaplaPop.innerHTML = '<form><b>Kredi Tutarı20:</b><div><input type="text" name="" id="dmGiris"><input type="submit" value="Hesapla" id="dmHesapla"></div></form>'
                            } else if (secilenAltBaslik == "Yıllık İzin Hesaplama Aracı") {
                                hesaplaPop.style = "display=flex;"
                                hesaplaPop.innerHTML = '<form><b>Kredi Tutarı21:</b><div><input type="text" name="" id="dmGiris"><input type="submit" value="Hesapla" id="dmHesapla"></div></form>'
                            } else if (secilenAltBaslik == "Desi Hesaplama Aracı") {
                                hesaplaPop.style = "display=flex;"
                                hesaplaPop.innerHTML = '<form><b>Kredi Tutarı22:</b><div><input type="text" name="" id="dmGiris"><input type="submit" value="Hesapla" id="dmHesapla"></div></form>'
                            } else if (secilenAltBaslik == "İndirim Hesaplama Aracı") {
                                hesaplaPop.style = "display=flex;"
                                hesaplaPop.innerHTML = '<form><b>Kredi Tutarı23:</b><div><input type="text" name="" id="dmGiris"><input type="submit" value="Hesapla" id="dmHesapla"></div></form>'
                            } else if (secilenAltBaslik == "Kâr Hesaplama Aracı") {
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