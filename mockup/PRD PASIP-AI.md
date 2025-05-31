## **Product Requirements Document (PRD)**

### **Platform Analisis Sentimen & Isu Publik Berbasis AI**

Versi: 1.0  
Tanggal: 30 Mei 2025  
Penulis: Parametrix Indonesia

### **1\. Pendahuluan**

Dokumen ini menguraikan persyaratan fungsional dan non-fungsional untuk pengembangan Platform Analisis Sentimen & Isu Publik Berbasis AI. Platform ini akan memungkinkan DPD Partai NasDem Kota Bandung untuk memantau, menganalisis, dan memahami sentimen masyarakat serta isu-isu yang berkembang di Kota Bandung secara *real-time* dari berbagai sumber *online*.

### **2\. Tujuan Produk**

* Menyediakan *insight* *real-time* mengenai opini publik dan isu-isu krusial di Kota Bandung.  
* Membantu partai dalam pengambilan keputusan strategis berbasis data.  
* Memungkinkan manajemen krisis proaktif dengan identifikasi cepat isu negatif.  
* Meningkatkan relevansi program dan narasi komunikasi partai.  
* Memberikan keunggulan kompetitif melalui pemahaman mendalam tentang lanskap politik dan opini publik.

### **3\. Audiens Target**

* **Pengguna Utama:**  
  * **Tim Strategi & Kampanye Partai:** Untuk perumusan strategi komunikasi dan kampanye.  
  * **Tim Media & Humas Partai:** Untuk pemantauan reputasi dan respons cepat terhadap isu.  
  * **Pimpinan Partai:** Untuk pengambilan keputusan tingkat tinggi.  
  * **Tim Riset Partai:** Untuk analisis mendalam dan penyusunan laporan.


### **4\. Fitur Fungsional**

#### **4.1. Modul Pengumpul Data (Crawler/Scraper)**

* **Sumber Data:**  
  * Media Sosial: Twitter/X (melalui API), Instagram (API terbatas/scraping etis), Facebook (melalui API/scraping grup publik).  
  * Berita Online: Media massa lokal dan nasional.  
  * Forum Diskusi & Blog Lokal: Situs-situs yang relevan dengan diskusi publik Kota Bandung.  
* **Manajemen *Keyword*:**  
  * Admin dapat menambahkan, mengedit, dan menghapus *keyword* yang dipantau (misal: "NasDem Bandung", "Ridwan Kamil", "isu banjir Bandung", "harga kebutuhan pokok").  
  * Dukungan untuk *boolean operators* (AND, OR, NOT) untuk *query* yang kompleks.  
* **Filter Data:**  
  * Filter berdasarkan tanggal, sumber, lokasi (jika tersedia), dan bahasa.


#### **4.2. Modul Analisis Sentimen & Isu (AI/NLP)**

* **Analisis Sentimen:**  
  * Klasifikasi sentimen otomatis (positif, negatif, netral) pada setiap mention atau artikel.  
  * Tingkat kepercayaan (confidence score) untuk setiap klasifikasi.  
  * Dukungan bahasa Indonesia yang kuat.  
* **Deteksi Topik & Tren:**  
  * Identifikasi topik-topik utama yang muncul dari data yang dikumpulkan.  
  * Pelacakan tren topik dari waktu ke waktu.  
* **Identifikasi *Influencer*:**  
  * Mengidentifikasi akun atau individu yang paling berpengaruh dalam diskusi terkait *keyword* tertentu.  
  * Metrik pengaruh (misal: jumlah *follower*, *engagement rate*).  
* **Analisis Entitas:**  
  * Ekstraksi entitas bernama (nama orang, organisasi, lokasi) dari teks.


#### **4.3. Dasbor Interaktif & Visualisasi Data**

* **Dasbor Utama:**  
  * Ringkasan sentimen keseluruhan (persentase positif, negatif, netral).  
  * Grafik tren sentimen dari waktu ke waktu.  
  * *Word cloud* dari *keyword* atau topik yang paling sering muncul.  
  * Peta panas (heatmap) isu berdasarkan lokasi (jika data lokasi tersedia).  
* **Filter & Drill-down:**  
  * Filter data berdasarkan *keyword*, sumber, tanggal, sentimen.  
  * Kemampuan untuk *drill-down* dari grafik ke detail mention atau artikel asli.  
* **Visualisasi Perbandingan:**  
  * Membandingkan sentimen terhadap beberapa *keyword* (misal: NasDem vs. Partai X).


#### **4.4. Sistem *Alert* & Laporan Otomatis**

* **Notifikasi *Alert*:**  
  * Admin dapat mengatur ambang batas (threshold) untuk sentimen negatif atau lonjakan volume diskusi.  
  * Notifikasi otomatis via email/SMS jika ambang batas terlampaui.  
* **Laporan Otomatis:**  
  * Laporan harian/mingguan/bulanan yang dihasilkan secara otomatis dan dikirim via email.  
  * Laporan dapat diunduh dalam format PDF/Excel dengan *insight* utama dan grafik.


#### **4.5. Modul Perbandingan**

* **Perbandingan Sentimen:**  
  * Membandingkan sentimen terhadap berbagai entitas (partai, tokoh, isu) dalam periode waktu yang sama.  
* **Perbandingan Volume Diskusi:**  
  * Membandingkan volume percakapan tentang berbagai *keyword*.


### **5\. Persyaratan Non-Fungsional**

* **Performa:**  
  * Data *refresh rate* minimal setiap 1-2 jam untuk sumber utama (media sosial, berita).  
  * Waktu respons dasbor \< 5 detik untuk sebagian besar *query*.  
  * Mampu memproses jutaan *mention* per bulan.  
* **Skalabilitas:**  
  * Arsitektur harus mampu menangani peningkatan volume data dan *keyword* yang dipantau.  
* **Keamanan:**  
  * Perlindungan data yang dikumpulkan sesuai regulasi privasi.  
  * Enkripsi data saat istirahat dan dalam transit.  
  * Autentikasi pengguna yang kuat dan otorisasi berbasis peran.  
  * Kepatuhan terhadap kebijakan penggunaan API dari platform media sosial.  
* **Usability (Kemudahan Penggunaan):**  
  * Dasbor yang intuitif dan mudah dinavigasi.  
  * Visualisasi data yang jelas dan mudah diinterpretasikan.  
* **Kompatibilitas:**  
  * Aplikasi web kompatibel dengan *browser* modern.  
* **Ketersediaan:**  
  * Uptime sistem minimal 99.5%.  
* **Akurasi AI/NLP:**  
  * Model sentimen harus memiliki akurasi yang dapat diterima untuk bahasa Indonesia (target minimal 80% akurasi).  
  * Kemampuan untuk melakukan *fine-tuning* model jika diperlukan.


### **6\. Integrasi (Potensial)**

* API Media Sosial (Twitter/X API, Facebook Graph API).  
* API Berita (jika ada agregator berita yang relevan).  
* SMS Gateway untuk *alert*.  
* Email Service untuk laporan.