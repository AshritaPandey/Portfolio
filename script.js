// Slideshow Logic
const slideIndices = {
    'gt': 1,
    'pb': 1,
    'ml': 1,
    'sl': 1
};

// Initialize all slideshows
document.addEventListener('DOMContentLoaded', () => {
    showSlides(1, 'gt');
    showSlides(1, 'pb');
    showSlides(1, 'ml');
    showSlides(1, 'sl');
});

// Next/previous controls
function plusSlides(n, galleryId) {
    showSlides(slideIndices[galleryId] += n, galleryId);
}

// Main function to show slides
function showSlides(n, galleryId) {
    const galleryContainer = document.getElementById(`slideshow-${galleryId}`);
    if (!galleryContainer) return;
    
    const slides = galleryContainer.getElementsByClassName("slide");
    if (slides.length === 0) return;
    
    if (n > slides.length) {
        slideIndices[galleryId] = 1;
    }
    if (n < 1) {
        slideIndices[galleryId] = slides.length;
    }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    slides[slideIndices[galleryId] - 1].style.display = "block";
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Remove active class from all nav links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked link
        if (this.classList.contains('active') === false && this.closest('.nav-links')) {
            this.classList.add('active');
        }

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form AJAX Submission
const contactForm = document.getElementById('contactForm');
const formResult = document.getElementById('form-result');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        formResult.innerHTML = "Sending message...";
        formResult.style.color = "var(--text-primary)";
        formResult.style.display = "block";

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                formResult.innerHTML = "✅ Message sent successfully!";
                formResult.style.color = "#00FF66";
                contactForm.reset();
            } else {
                console.log(response);
                formResult.innerHTML = json.message;
                formResult.style.color = "var(--accent-color)";
            }
        })
        .catch(error => {
            console.log(error);
            formResult.innerHTML = "Something went wrong!";
            formResult.style.color = "var(--accent-color)";
        })
        .then(function() {
            setTimeout(() => {
                formResult.style.display = "none";
            }, 5000);
        });
    });
}
