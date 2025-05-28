<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Photo Gallery | Ivory University House</title>
    <link href="https://fonts.googleapis.com/css?family=Oswald:300,400,500,600,700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        :root {
            --iuh-black: #000000;
            --iuh-white: #FFFFFF;
            --iuh-red: #E84B3F;
            --iuh-storm: #367D3D;
            --iuh-blue: #4CA2C6;
            --iuh-mayo: #F1C24B;
            --iuh-gray: #E7E5E3;
            --banner-height: 40px;
            --navbar-height: 100px;
        }
        html, body {
            font-family: 'Oswald', Arial, 'Helvetica Neue', Helvetica, sans-serif;
            font-weight: 300;
            background: var(--iuh-gray);
            color: var(--iuh-black);
            margin: 0;
            padding: 0;
        }
        body {
            padding-top: calc(var(--banner-height) + var(--navbar-height));
        }
        .special.banner {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: var(--banner-height);
            background-color: var(--iuh-red);
            color: var(--iuh-white);
            text-align: center;
            font-weight: 700;
            z-index: 1100;
            display: flex;
            align-items: center;
            justify-content: center;
            letter-spacing: 0.05em;
        }
        .navbar {
            position: fixed;
            top: var(--banner-height);
            left: 0;
            width: 100%;
            height: var(--navbar-height);
            z-index: 1050;
            background-color: var(--iuh-black);
            margin-top: 0 !important;
            display: flex;
            align-items: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .navbar .container-fluid {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding-left: 0;
            padding-right: 0;
            position: relative;
        }
        .navbar-brand {
            position: static;
            margin-left: 32px;
            margin-right: 32px;
            transform: none;
            left: unset;
        }
        .navbar-brand img {
            height: 60px;
            width: auto;
            display: block;
            margin: 0 auto;
        }
        .navbar .collapse.navbar-collapse {
            flex-grow: 0;
            margin-left: auto;
        }
        .navbar .nav-link, .navbar .btn {
            color: var(--iuh-white) !important;
            font-weight: 500;
            font-size: 1.1rem;
            letter-spacing: 0.03em;
        }
        .navbar .btn-primary {
            background: var(--iuh-blue);
            border: none;
        }
        .navbar .btn-danger {
            background: var(--iuh-red);
            border: none;
        }
        .navbar .btn-primary:hover, .navbar .btn-danger:hover {
            opacity: 0.85;
        }
        .gallery-hero {
            background: var(--iuh-storm);
            color: var(--iuh-white);
            padding: 120px 0 60px 0;
            text-align: center;
            margin-top: calc(var(--banner-height) + var(--navbar-height));
        }
        .gallery-hero h1 {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 18px;
            letter-spacing: 0.04em;
        }
        .gallery-hero p {
            font-size: 1.3rem;
            font-weight: 400;
            margin-bottom: 0;
        }
        .gallery-section {
            max-width: 1400px;
            margin: 0 auto;
            padding: 40px 20px 80px 20px;
        }
        /* Masonry Grid */
        .gallery-masonry {
            column-count: 4;
            column-gap: 24px;
        }
        .gallery-masonry .gallery-item {
            break-inside: avoid;
            margin-bottom: 24px;
            position: relative;
            cursor: pointer;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 2px 12px rgba(0,0,0,0.08);
            background: var(--iuh-white);
            transition: transform 0.18s cubic-bezier(.4,0,.2,1), box-shadow 0.18s;
        }
        .gallery-masonry .gallery-item:hover {
            transform: scale(1.025);
            box-shadow: 0 6px 24px rgba(52,125,61,0.13);
            z-index: 2;
        }
        .gallery-masonry .gallery-item img {
            width: 100%;
            display: block;
            object-fit: cover;
            transition: filter 0.2s;
            min-height: 180px;
        }
        .gallery-masonry .gallery-item .caption {
            position: absolute;
            left: 0; right: 0; bottom: 0;
            background: linear-gradient(0deg, rgba(52,125,61,0.92) 0%, rgba(52,125,61,0.0) 100%);
            color: var(--iuh-white);
            padding: 18px 18px 10px 18px;
            font-size: 1.1rem;
            font-weight: 500;
            opacity: 0;
            transition: opacity 0.2s;
            pointer-events: none;
        }
        .gallery-masonry .gallery-item:hover .caption {
            opacity: 1;
        }
        @media (max-width: 1200px) { .gallery-masonry { column-count: 3; } }
        @media (max-width: 900px) { .gallery-masonry { column-count: 2; } }
        @media (max-width: 600px) { .gallery-masonry { column-count: 1; } }
        .lightbox {
            display: none;
            position: fixed;
            z-index: 2000;
            left: 0; top: 0; width: 100vw; height: 100vh;
            background: rgba(0,0,0,0.97);
            align-items: center;
            justify-content: center;
        }
        .lightbox.active { display: flex; }
        .lightbox-content {
            position: relative;
            max-width: 96vw;
            max-height: 92vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .lightbox-content img {
            width: auto;
            height: 80vh;
            max-width: 90vw;
            max-height: 90vh;
            border-radius: 10px;
            box-shadow: 0 2px 16px rgba(0,0,0,0.25);
            background: #fff;
            object-fit: contain;
        }
        .lightbox-close, .lightbox-prev, .lightbox-next {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0,0,0,0.45);
            color: #fff;
            border: none;
            border-radius: 50%;
            width: 48px;
            height: 48px;
            font-size: 2.2rem;
            cursor: pointer;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .lightbox-close {
            top: 24px;
            right: 24px;
            left: auto;
            transform: none;
            font-size: 2.5rem;
            background: rgba(0,0,0,0.7);
        }
        .lightbox-prev { left: -60px; }
        .lightbox-next { right: -60px; }
        .lightbox-close:hover, .lightbox-prev:hover, .lightbox-next:hover { background: #E84B3F; }
        .lightbox-caption {
            color: #fff;
            text-align: center;
            margin-top: 18px;
            font-size: 1.2rem;
            font-weight: 500;
            text-shadow: 0 2px 8px rgba(0,0,0,0.25);
        }
        @media (max-width: 900px) {
            .lightbox-content img { height: 50vh; }
            .lightbox-prev, .lightbox-next { width: 38px; height: 38px; font-size: 1.5rem; left: -36px; right: -36px; }
        }
        @media (max-width: 600px) {
            .lightbox-content img { height: 36vh; }
            .lightbox-prev, .lightbox-next { left: 4px; right: 4px; top: 90%; transform: translateY(-50%); }
            .lightbox-close { top: 8px; right: 8px; }
        }
    </style>
        /* Footer styles */
        .footer-section {
            width: 100vw;
            background: var(--iuh-black);
            color: var(--iuh-white);
            margin: 60px 0 0 0;
            border-radius: 12px 12px 0 0;
            box-shadow: 0 -2px 12px rgba(0,0,0,0.06);
            padding: 0;
            position: relative;
            left: 50%;
            right: 50%;
            margin-left: -50vw;
            margin-right: -50vw;
        }
        .footer-section-inner {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            padding: 40px 20px;
            gap: 40px;
        }
        .footer-section-inner > div {
            flex: 1 1 0;
            min-width: 200px;
        }
        .footer-logo {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .footer-logo img {
            max-width: 180px;
            min-width: 100px;
            width: 100%;
            background: var(--iuh-white);
            border-radius: 8px;
            display: block;
            margin: 0 auto;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .footer-office-hours h3,
        .footer-contact h3 {
            font-size: 1.2rem;
            font-weight: 700;
            margin-bottom: 10px;
            letter-spacing: 0.03em;
            color: var(--iuh-mayo);
        }
        .footer-office-hours p,
        .footer-contact p {
            margin: 0 0 6px 0;
            font-size: 1rem;
            color: var(--iuh-white);
        }
        .footer-social {
            margin-top: 12px;
            display: flex;
            gap: 14px;
            justify-content: flex-start;
        }
        .footer-social-icon img {
            width: 28px;
            height: 28px;
            filter: grayscale(1) brightness(1.2);
            transition: filter 0.2s;
        }
        .footer-social-icon img:hover {
            filter: none;
        }
        @media (max-width: 900px) {
            .footer-section-inner {
                flex-direction: column;
                align-items: center;
                gap: 24px;
                padding: 24px 10px;
            }
            .footer-section-inner > div {
                min-width: 0;
                width: 100%;
                text-align: center;
            }
            .footer-logo img {
                margin: 20px auto;
            }
            .footer-social {
                justify-content: center;
            }
        }
        @media (max-width: 700px) {
            .footer-section-inner {
                flex-direction: column;
                gap: 20px;
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="special banner">Special Go Here</div>
    <nav class="navbar navbar-expand-lg navbar-light fixed-top">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="images/IvoryUniversityHouse_PrimaryLogo_FullColorWhiteText_Opt1.png" alt="Ivory University House logo">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item" >
                        <a class="nav-link" href="./our_impact.html">Our Impact</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="./gallery.php">Photo Gallery</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="./floorplan.html">Floorplan</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Contact Us</a>
                    </li>
                    <li class="nav-item">
                        <button type="button" class="btn btn-primary">Resident Portal</button>
                    </li>
                    <li class="nav-item">
                        <button type="button" class="btn btn-danger"><a class="nav-link" href="./our_impact.html">Our Impact</a></button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="gallery-hero">
        <h1>Photo Gallery</h1>
        <p>Explore our vibrant community, modern amenities, and beautiful living spaces at Ivory University House.</p>
    </div>
    <section class="gallery-section">
        <div class="gallery-masonry" id="galleryMasonry">
            <!-- Images will be injected here by JS -->
        </div>
    </section>
    <!-- Lightbox Modal -->
    <div class="lightbox" id="lightbox">
        <div class="lightbox-content">
            <button class="lightbox-close" id="lightboxClose" aria-label="Close">&times;</button>
            <button class="lightbox-prev" id="lightboxPrev" aria-label="Previous">&#10094;</button>
            <img src="" alt="Gallery Large" id="lightboxImg">
            <button class="lightbox-next" id="lightboxNext" aria-label="Next">&#10095;</button>
        </div>
        <div class="lightbox-caption" id="lightboxCaption"></div>
    </div>
    <footer class="footer-section">
        <div class="footer-section-inner">
            <div class="footer-office-hours">
                <h3>OFFICE HOURS</h3>
                <p>M-F 9AM - 6PM</p>
                <p>SAT 10AM - 5PM</p>
                <p>SUN 1PM - 5PM</p>
                <p style="color: var(--iuh-red); font-weight: bold; margin-top: 10px;">🔍 RESIDENTS</p>
                <p style="color: var(--iuh-red); text-transform: uppercase; font-weight: bold; margin-top: 5px;">Schedule a Self-Guided Tour</p>
            </div>
            <div class="footer-logo">
                <img src="images/IvoryUniversityHouse_PrimaryLogo_OneColor_Black.png" alt="Ivory University House logo">
            </div>
            <div class="footer-contact">
                <h3>CONTACT US</h3>
                <p>1949 E UNIVERSITY DR.</p>
                <p>TEMPE, AZ 85281</p>
                <p style="font-weight: bold;">CALL OR TEXT (520) 422-7879</p>
                <div class="footer-social">
                    <a href="https://facebook.com" target="_blank" aria-label="Facebook" class="footer-social-icon">
                        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/facebook.svg" alt="Facebook">
                    </a>
                    <a href="https://twitter.com" target="_blank" aria-label="Twitter" class="footer-social-icon">
                        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/twitter.svg" alt="Twitter">
                    </a>
                    <a href="https://instagram.com" target="_blank" aria-label="Instagram" class="footer-social-icon">
                        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg" alt="Instagram">
                    </a>
                    <a href="https://tiktok.com" target="_blank" aria-label="TikTok" class="footer-social-icon">
                        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tiktok.svg" alt="TikTok">
                    </a>
                </div>
            </div>
        </div>
    </footer>
    <script>
        <?php
        // Manually list all gallery images here (add or remove as needed)
        $galleryImages = [
            // Example entries - replace with your actual filenames
            ['filename' => '/images/Gallery/living_room.jpg', 'caption' => 'Living Room'],
            ['filename' => '/images/Gallery/pool_area.jpg', 'caption' => 'Pool Area'],
            ['filename' => '/images/Gallery/gym.jpg', 'caption' => 'Gym'],
            ['filename' => '/images/Gallery/kitchen.jpg', 'caption' => 'Kitchen'],
            ['filename' => '/images/Gallery/bedroom.jpg', 'caption' => 'Bedroom'],
            ['filename' => '/images/Gallery/study_room.jpg', 'caption' => 'Study Room'],
            ['filename' => '/images/Gallery/community_space.jpg', 'caption' => 'Community Space'],
            ['filename' => '/images/Gallery/exterior_view.jpg', 'caption' => 'Exterior View'],
            // Add more images as needed
        ];
        ?>
        // Gallery images array from PHP manual list
        const galleryImages = <?php echo json_encode($galleryImages); ?>;
        // 2. Dynamically generate the gallery grid
        const galleryMasonry = document.getElementById('galleryMasonry');
        galleryImages.forEach((img, idx) => {
            const div = document.createElement('div');
            div.className = 'gallery-item';
            div.setAttribute('data-full', img.filename);
            div.setAttribute('data-caption', img.caption || '');
            div.setAttribute('data-index', idx);
            div.innerHTML = `
                <img src="${img.filename}" alt="${img.caption || 'Gallery Photo'}">
                <div class="caption">${img.caption || ''}</div>
            `;
            galleryMasonry.appendChild(div);
        });

        // 3. Lightbox logic
        const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightboxImg');
        const lightboxCaption = document.getElementById('lightboxCaption');
        let currentIndex = 0;

        function showLightbox(index) {
            const img = galleryImages[index];
            lightboxImg.src = img.filename;
            lightboxCaption.textContent = img.caption || '';
            lightbox.classList.add('active');
            currentIndex = index;
        }

        galleryItems.forEach((item, idx) => {
            item.addEventListener('click', () => showLightbox(idx));
        });

        document.getElementById('lightboxClose').addEventListener('click', function() {
            lightbox.classList.remove('active');
            lightboxImg.src = '';
        });

        document.getElementById('lightboxPrev').addEventListener('click', function(e) {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            showLightbox(currentIndex);
        });

        document.getElementById('lightboxNext').addEventListener('click', function(e) {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % galleryImages.length;
            showLightbox(currentIndex);
        });

        lightbox.addEventListener('click', function(e) {
            if (e.target === this) {
                lightbox.classList.remove('active');
                lightboxImg.src = '';
            }
        });

        document.addEventListener('keydown', function(e) {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === "Escape") {
                lightbox.classList.remove('active');
                lightboxImg.src = '';
            } else if (e.key === "ArrowLeft") {
                currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
                showLightbox(currentIndex);
            } else if (e.key === "ArrowRight") {
                currentIndex = (currentIndex + 1) % galleryImages.length;
                showLightbox(currentIndex);
            }
        });
    </script>
</body>
</html>
