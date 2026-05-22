<?php
// Static SEO configurations for main pages
$seoConfig = [
    'home' => [
        'title' => 'Flexible & Product Packaging Services by Amul Packaging',
        'description' => 'Amul Packaging delivers reliable flexible packaging and product packaging with superior quality, custom designs, and fast service for businesses of all sizes.',
        'keywords' => 'flexible packaging, product packging',
        'image' => 'https://www.amulpackaging.in/img/Banner.jpg',
        'url' => 'https://www.amulpackaging.in'
    ],
    'about' => [
        'title' => 'Who We Are: Amul Packaging & Our Good Packaging Products',
        'description' => 'Learn how Amul Packaging designs and manufactures good packaging products trusted across industries. Explore our history, expertise, and commitment to quality.',
        'keywords' => 'good packaging products',
        'image' => 'https://www.amulpackaging.in/img/about.jpg',
        'url' => 'https://www.amulpackaging.in/about'
    ],
    'products' => [
        'title' => 'Cool Product Packaging for Better Customer Reach',
        'description' => 'Upgrade your brand with cool product packaging that blends style, strength, and creativity to make your products stand out on any shelf.',
        'keywords' => 'cool product packaging',
        'image' => 'https://www.amulpackaging.in/img/slider_banner/Products.jpg',
        'url' => 'https://www.amulpackaging.in/products'
    ],
    'services' => [
        'title' => 'Amul Packaging Services | Great Product Packaging Solutions',
        'description' => 'Explore Amul Packaging’s services offering great product packaging designed for durability, branding, and performance across multiple industries.',
        'keywords' => 'great product packaging',
        'image' => 'https://www.amulpackaging.in/img/slider_banner/Service.jpg',
        'url' => 'https://www.amulpackaging.in/services'
    ],
    'contact' => [
        'title' => 'For the Best Product Packaging | Contact Us | Amul Packaging',
        'description' => 'Contact Amul Packaging for the best product packaging solutions. Get expert support, custom options, and reliable service for all your packaging needs.',
        'keywords' => 'best product packaging',
        'image' => 'https://www.amulpackaging.in/img/slider_banner/contactus.jpg',
        'url' => 'https://www.amulpackaging.in/contact'
    ],
    'industries' => [
        'title' => 'Food Product Packaging Design for Industries | Amul Packaging',
        'description' => 'Industry-specific food product packaging design by Amul Packaging, ensuring quality, protection, and appeal for every product category.',
        'keywords' => 'food product packaging design',
        'image' => 'https://www.amulpackaging.in/img/slider_banner/Products.jpg',
        'url' => 'https://www.amulpackaging.in/industriesweserve'
    ],
    'privacy' => [
        'title' => 'Privacy Policy | Amul Packaging',
        'description' => 'Privacy policy and data protection information for Amul Packaging website visitors and customers.',
        'keywords' => 'privacy policy, data protection, Amul Packaging privacy',
        'image' => 'https://www.amulpackaging.in/img/logo.png',
        'url' => 'https://www.amulpackaging.in/privacyPolicy'
    ],
    'terms' => [
        'title' => 'Terms & Conditions | Amul Packaging',
        'description' => 'Terms and conditions for using Amul Packaging services and website.',
        'keywords' => 'terms conditions, Amul Packaging terms',
        'image' => 'https://www.amulpackaging.in/img/logo.png',
        'url' => 'https://www.amulpackaging.in/termCondition'
    ],
    'service_standup' => [
        'title' => 'Stand Up Pouch Manufacturer in Bhiwandi | Amul Packaging',
        'description' => 'Leading stand up pouch manufacturer in Bhiwandi. High-quality flexible packaging solutions for food, pharma, and retail industries.',
        'keywords' => 'stand up pouch manufacturer bhiwandi, flexible packaging bhiwandi',
        'image' => 'https://www.amulpackaging.in/img/products/Standup-zipper-pouch.jpg',
        'url' => 'https://www.amulpackaging.in/services/stand-up-pouch-manufacturer-in-bhiwandi'
    ],
    'service_flatbottom' => [
        'title' => 'Flat Bottom Pouch Supplier in Bhiwandi | Amul Packaging',
        'description' => 'Reliable flat bottom pouch supplier in Bhiwandi. Premium packaging for coffee, pet food, and snacks with superior shelf appeal.',
        'keywords' => 'flat bottom pouch supplier bhiwandi, premium packaging bhiwandi',
        'image' => 'https://www.amulpackaging.in/img/products/Flat-Bottom-Pouch.jpg',
        'url' => 'https://www.amulpackaging.in/services/flat-bottom-pouch-supplier-in-bhiwandi'
    ]
];

function getSEOConfig($page, $base_url = "https://www.amulpackaging.in") {
    global $seoConfig;
    $config = isset($seoConfig[$page]) ? $seoConfig[$page] : $seoConfig['home'];
    
    // Make URLs and Images absolute using the provided base_url
    if (isset($config['url']) && strpos($config['url'], 'https://www.amulpackaging.in') === 0) {
        $config['url'] = str_replace('https://www.amulpackaging.in', $base_url, $config['url']);
    }
    
    if (isset($config['image']) && strpos($config['image'], 'https://www.amulpackaging.in') === 0) {
        $config['image'] = str_replace('https://www.amulpackaging.in', $base_url, $config['image']);
    } elseif (isset($config['image']) && strpos($config['image'], '/') === 0) {
        $config['image'] = $base_url . $config['image'];
    }
    
    return $config;
}
?>
