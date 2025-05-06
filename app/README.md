# Blog API with Elysia.js and Bun

Bu proje, bir blog ve kullanıcı yönetim API'si örneğidir. [Elysia.js](https://elysiajs.com/) ve [Bun](https://bun.sh/) runtime kullanarak geliştirilmiştir.

## Özellikler

- Kullanıcı oluşturma, güncelleme, silme ve listeleme
- Blog yazısı oluşturma, güncelleme, silme ve listeleme 
- API dokümantasyonu (Swagger UI)
- Modüler ve temiz kod yapısı
- SQLite veritabanı

## Kurulum

1. Bun'ı bilgisayarınıza kurun:
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. Projeyi klonlayın ve bağımlılıkları yükleyin:
   ```bash
   git clone <repo-url>
   cd app
   bun install
   ```

3. Veritabanını oluşturun ve migration'ları çalıştırın:
   ```bash
   bun run src/config/migrate.ts
   ```

## Geliştirme

Geliştirme sunucusunu başlatmak için:
```bash
bun run dev
```

Uygulama http://localhost:3000/ adresinde çalışmaya başlayacaktır.
API dokümantasyonu http://localhost:3000/swagger adresinde görüntülenebilir.

## Proje Yapısı

```
src/
├── config/         # Veritabanı yapılandırması
├── modules/
│   ├── blogs/      # Blog modülü
│   │   ├── controller.ts
│   │   ├── router.ts
│   │   ├── service.ts
│   │   └── types.ts
│   └── users/      # Kullanıcı modülü
│       ├── controller.ts
│       ├── router.ts
│       ├── service.ts
│       └── types.ts
└── index.ts        # Ana uygulama
```