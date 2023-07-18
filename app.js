// Selectors
const ekleBtn=document.getElementById("ekle-btn");
const gelirInput=document.getElementById("gelir-input");
const ekleForm=document.getElementById("ekle-form")

//sonuc tablusu selectorleri
const gelirinizTd=document.getElementById("geliriniz")
const giderinizTd=document.getElementById("gideriniz")
const kalanTd=document.getElementById("kalan")

//harcama formu
const harcamaFormu=document.getElementById("harcama-formu")
const harcamaAlaniInput=document.getElementById("harcama-alani")
const tarihInput=document.getElementById("tarih")
const miktarInput=document.getElementById("miktar")

// harcamam tablosu
const haracamaBody=document.getElementById("harcama-body")

// Bilgileri Temizle
const temizleBtn=document.getElementById("temizle-btn")

// Değişkenler
let gelirler= 0;
let UniqId=0;
let haracaListesi=[];




// Events

ekleForm.addEventListener("submit", (e)=>{
  e.preventDefault();
  gelirler+=Number(gelirInput.value)

  localStorage.setItem("gelirler",gelirler);


  ekleForm.reset();
  console.log(gelirler);
  hesaplaVeGuncelle()
})

window.addEventListener("load",()=>{
  tarihInput.valueAsDate=new Date()
  gelirler=Number(localStorage.getItem("gelirler"))
  haracaListesi=JSON.parse(localStorage.getItem("harcamalar")) || [];
  haracaListesi.forEach((h)=>harcamayiDomaYaz(h))
  // console.log(gelirler);
  // console.log(haracaListesi);
  hesaplaVeGuncelle()
})

const hesaplaVeGuncelle=()=>{
  gelirinizTd.innerText=gelirler;
  const giderler=haracaListesi.reduce((toplam,harcama)=>toplam+Number(harcama.miktar),0)
  giderinizTd.innerText=giderler;
  kalanTd.innerText=gelirler-giderler;
  console.log(giderler);
}

harcamaFormu.addEventListener("submit",(e)=>{
  e.preventDefault();
  // UniqId++;
  let yeniHarcama={
    id: new Date().getTime(),
    tarih: tarihInput.value,
    alan: harcamaAlaniInput.value,
    miktar:miktarInput.value
    }
    haracaListesi.push(yeniHarcama);

    //! localStorage haracama listesi dizisini stringleştirerek gönderiyorum.
    localStorage.setItem("harcamalar",JSON.stringify(haracaListesi))
    harcamayiDomaYaz(yeniHarcama);
    hesaplaVeGuncelle()
    harcamaFormu.reset();
    tarihInput.valueAsDate=new Date()
    console.log(haracaListesi);
})

const harcamayiDomaYaz=(yeniHarcama)=>{
  const {id, miktar, tarih, alan}= yeniHarcama
  haracamaBody.innerHTML+=`
  <tr>
    <td>${tarih}</td>
    <td>${alan}</td>
    <td>${miktar}</td>
    <td><i id="${id}" class="fa-solid fa-trash-can text-danger" type="button"></i></td>
  </tr>
  `
}

haracamaBody.addEventListener("click",(e)=>{
  if (e.target.classList.contains("fa-trash-can")) {
    e.target.parentElement.parentElement.remove();

    let id=e.target.id;
    haracaListesi = haracaListesi.filter((harcama)=> harcama.id != id)
    localStorage.setItem("harcamalar",JSON.stringify(haracaListesi))
    hesaplaVeGuncelle();
  }
})

temizleBtn.addEventListener("click", ()=>{
  localStorage.clear();
  haracaListesi=[];
  gelirler=0;
  giderler=0;
  haracamaBody.innerHTML=""
  hesaplaVeGuncelle();
} )