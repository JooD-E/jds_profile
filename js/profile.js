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

  // ==========================================================
  // 3. Skill 섹션: 숙련도 바 애니메이션
  // ==========================================================
  // 새 스킬 추가 시 HTML에 skill-item + data-percent 만 넣으면 됨.
  // ==========================================================
  const skillItems = document.querySelectorAll('.skill-item');

  if (skillItems.length) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const item = entry.target;
          const fill = item.querySelector('.skill-fill');
          const percent = item.dataset.percent || 0;
          if (fill) fill.style.width = percent + '%';
          skillObserver.unobserve(item);
        }
      });
    }, { threshold: 0.4 });

    skillItems.forEach((item) => skillObserver.observe(item));
  }

  // ==========================================================
  // 4. Side Dot Navigation - 자동 생성 & 스크롤 동기화
  // ==========================================================
  //   data-nav-label="라벨명" data-nav-color="#컬러"
  // ==========================================================
  const nav = document.querySelector('.side-nav');
  const sections = document.querySelectorAll('.project-intro-section');

  if (nav && sections.length) {
    sections.forEach((section) => {
      const label = section.dataset.navLabel || section.id;
      const color = section.dataset.navColor || '#ffffff';

      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'side-nav-dot';
      dot.dataset.target = section.id;
      dot.style.setProperty('--dot-color', color);
      dot.setAttribute('aria-label', `${label} 섹션으로 이동`);

      const labelEl = document.createElement('span');
      labelEl.className = 'side-nav-label';
      labelEl.textContent = label;
      dot.appendChild(labelEl);

      function smoothScroll(target, duration) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);

          const ease = 1 - Math.pow(1 - progress, 3);

          window.scrollTo(0, startPosition + distance * ease);

          if(timeElapsed < duration ) {
            requestAnimationFrame(animation);
          }
        }

        requestAnimationFrame(animation);
      }

      dot.addEventListener('click', () => {
        smoothScroll(section, 800);
      });

      nav.appendChild(dot);
    });

    const dots = nav.querySelectorAll('.side-nav-dot');
    const activeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          dots.forEach((d) => d.classList.remove('is-active'));
          const activeDot = nav.querySelector(`[data-target="${entry.target.id}"]`);
          if (activeDot) activeDot.classList.add('is-active');
        }
      });
    }, {
      rootMargin: '-40% 0px -40% 0px'
    });
    sections.forEach((section) => activeObserver.observe(section));

    const intro = document.querySelector('.intro-box');
    if (intro) {
      const visibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          nav.classList.toggle('is-visible', !entry.isIntersecting);
        });
      }, { threshold: 0 });
      visibilityObserver.observe(intro);
    } else {
      nav.classList.add('is-visible');
    }
  }
});
