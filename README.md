# todo-list-project
- Udemy'den aldığım "Modern Web Geliştirme Kursu  Sıfırdan Sektörün Yükseklerine" kursunun bir uygulama projesidir.

## Projeden Öğrendiklerim:

- confirm(): Bize koşullu bir "alert" sunar. "Tamam" veya "iptal" şeklinde iki seçenek verir.
```
 if (confirm("")) {
   }
```

- DOMContentLoaded(event): Storage'da kayıtlı içerikleri yüklememize olanak sağlar.

- splice(): 
> sil: dizi.splice(2, 1); 
> → 2. indisten başla 1 tane sil, silinecek adet sayısı belirtilmezse 2. indisten başlar sona kadar siler.

> ekle: dizi.splice(1,0,"x", "y"); 
> → 1. indisten başla (değeri 1. indisin önüne koyar), değer silme (0 koyarak değer silme diyoruz), 
> sonradan yazılanları diziye 1. indisten itibaren ekle

- trim(): trim fonksiyonu, girdinin başında veya sonunda boşluk varsa siler

- setTimeout():

> const alert = ...
> setTimeout(function name() {
>         alert.remove()
>     }, 2000)
