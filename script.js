/**
 * whagon.fyi - Interactive Script
 * Domain sale landing page logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Elements Definition
  const copyDomainBtn = document.getElementById('copyDomainBtn');
  const copyBtnText = document.getElementById('copyBtnText');
  const toast = document.getElementById('toast');

  const inquiryModal = document.getElementById('inquiryModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const inquiryForm = document.getElementById('inquiryForm');

  // Trigger buttons for offer modal
  const navInquireBtn = document.getElementById('navInquireBtn');
  const heroInquireBtn = document.getElementById('heroInquireBtn');
  const ctaInquireBtn = document.getElementById('ctaInquireBtn');
  const footerInquireLink = document.getElementById('footerInquireLink');

  const DOMAIN_NAME = 'whagon.fyi';

  // 2. Copy Domain to Clipboard
  if (copyDomainBtn) {
    copyDomainBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(DOMAIN_NAME)
        .then(() => {
          showToast('Domain whagon.fyi copied to clipboard!');
          if (copyBtnText) {
            const originalText = copyBtnText.textContent;
            copyBtnText.textContent = 'Copied!';
            setTimeout(() => {
              copyBtnText.textContent = originalText;
            }, 2000);
          }
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
          showToast('Domain name: whagon.fyi');
        });
    });
  }

  // Helper: Show Toast Notification
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // 3. Modal Controls
  function openModal() {
    if (inquiryModal) {
      inquiryModal.classList.add('active');
      inquiryModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (inquiryModal) {
      inquiryModal.classList.remove('active');
      inquiryModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = 'auto';
    }
  }

  // Bind Open Trigger Buttons
  [navInquireBtn, heroInquireBtn, ctaInquireBtn, footerInquireLink].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    }
  });

  // Bind Close Trigger Buttons
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (inquiryModal) {
    inquiryModal.addEventListener('click', (e) => {
      if (e.target === inquiryModal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && inquiryModal && inquiryModal.classList.contains('active')) {
      closeModal();
    }
  });

  // 4. Inquiry Form Submission Logic (Generates Mailto & Fallback)
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('buyerName').value.trim();
      const email = document.getElementById('buyerEmail').value.trim();
      const amount = document.getElementById('offerAmount').value.trim();
      const message = document.getElementById('buyerMessage').value.trim();

      if (!name || !email || !amount) {
        showToast('Please fill in all required fields.');
        return;
      }

      // Construct Email Subject & Body
      const mailSubject = encodeURIComponent(`[whagon.fyi] Acquisition Offer ($${amount}) from ${name}`);
      const mailBody = encodeURIComponent(
        `Domain Offer Details for whagon.fyi:\n\n` +
        `• Name / Organization: ${name}\n` +
        `• Email Address: ${email}\n` +
        `• Proposed Offer: $${amount} USD\n\n` +
        `• Message / Additional Terms:\n${message || 'No additional message provided.'}\n\n` +
        `----------------------------------------\n` +
        `Sent via whagon.fyi Landing Page`
      );

      // Open mailto link
      const mailtoUrl = `mailto:klaude416@gmail.com?subject=${mailSubject}&body=${mailBody}`;
      
      closeModal();
      showToast('Preparing email client with your offer details...');
      
      // Delay slightly for UX toast
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 500);

      // Reset form
      inquiryForm.reset();
    });
  }

  // 5. Scroll Animations (Intersection Observer)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.glass-card, .section-header, .metrics-ribbon').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
});
