document.addEventListener('DOMContentLoaded', function() {
  
  const targetSection = document.querySelector('.about-section');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      
      if (entry.isIntersecting) {
        
        new Typed('#typing-concept', {
          strings: ['사용자가 움직이는 방식을 먼저 고민하고,<br>그 시선 끝에 직관적인 경험을 정확히 전달하겠습니다.'],
          typeSpeed: 50,
          startDelay: 300,
          showCursor: true,
          cursorChar: '|'
        });

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5 
  });

  if (targetSection) {
    observer.observe(targetSection);
  }
  // ==========================================================
  // 2. Project 섹션: 설명 박스 페이드인 효과
  // ==========================================================
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, {
    threshold: 0.4
  });

  const metaBoxes = document.querySelectorAll('.project-meta-box');
  metaBoxes.forEach(box => {
    fadeObserver.observe(box);
  });
});
