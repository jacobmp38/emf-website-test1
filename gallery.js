 // Get modal elements
 const modal = document.getElementById('fullscreenModal');
 const modalImg = document.getElementById('modalImage');
 const modalCaption = document.getElementById('modalCaption');
 const closeBtn = document.querySelector('.close-btn');
 const prevBtn = document.querySelector('.prev-btn');
 const nextBtn = document.querySelector('.next-btn');
 
 // Get all gallery items
 const galleryItems = document.querySelectorAll('.gallery-item');
 let currentIndex = 0;
 
 // Open modal with clicked image
 galleryItems.forEach((item, index) => {
   item.addEventListener('click', () => {
     currentIndex = index;
     openModal(item);
   });
 });
 
 // Function to open modal
 function openModal(item) {
   const img = item.querySelector('img');
   const caption = item.querySelector('.item-caption');
   
   modalImg.src = img.src;
   modalCaption.textContent = caption.textContent;
   
   // Show modal with animation
   modal.classList.add('active');
   
   // Disable scrolling on body
   document.body.style.overflow = 'hidden';
 }
 
 // Close modal
 closeBtn.addEventListener('click', closeModal);
 modal.addEventListener('click', (e) => {
   if (e.target === modal) {
     closeModal();
   }
 });
 
 // Close with Escape key
 document.addEventListener('keydown', (e) => {
   if (e.key === 'Escape') {
     closeModal();
   } else if (e.key === 'ArrowLeft') {
     navigate(-1);
   } else if (e.key === 'ArrowRight') {
     navigate(1);
   }
 });
 
 function closeModal() {
   modal.classList.remove('active');
   document.body.style.overflow = 'auto';
 }
 
 // Navigation
 prevBtn.addEventListener('click', () => navigate(-1));
 nextBtn.addEventListener('click', () => navigate(1));
 
 function navigate(direction) {
   currentIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
   const item = galleryItems[currentIndex];
   const img = item.querySelector('img');
   const caption = item.querySelector('.item-caption');
   
   // Fade effect during transition
   modalImg.style.opacity = '0';
   modalCaption.style.opacity = '0';
   
   setTimeout(() => {
     modalImg.src = img.src;
     modalCaption.textContent = caption.textContent;
     modalImg.style.opacity = '1';
     modalCaption.style.opacity = '1';
   }, 200);
 }