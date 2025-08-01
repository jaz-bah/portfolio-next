
// accordion initialization
export function accordion(accordionEl: HTMLElement, device: string) {
    if (!accordionEl) return;

    const accordionItems = accordionEl.querySelectorAll('.accordion_item');
    const accordionNotification = accordionEl.querySelector('.notification');
    let accordionIsClosed = true;
    let exp_currentX = 0;
    let exp_currentY = 0;
    let exp_targetX = 0;
    let exp_targetY = 0;
    let exp_animationFrameId: number;

    accordionItems.forEach((accordionItem) => {
        const accordionHeader = accordionItem.querySelector('.header') as HTMLElement;
        const accordionContent = accordionItem.querySelector('.content_wrapper') as HTMLElement;
        const content = accordionContent?.querySelector('.content') as HTMLElement;
        const contentHeight = content?.offsetHeight ?? 0;

        accordionHeader.addEventListener('click', () => {
            accordionItems.forEach((item) => {
                const itemContent = item.querySelector('.content_wrapper') as HTMLElement;
                if (item !== accordionItem) {
                    itemContent.style.height = '0px';
                } else {
                    if (accordionContent.style.height === '0px' || accordionContent.style.height === '') {
                        accordionContent.style.height = contentHeight + 'px';
                        accordionIsClosed = false;
                    } else {
                        accordionContent.style.height = '0px';
                        accordionIsClosed = true;
                    }
                }
            });
        });
    });

    if (device === 'desktop' && accordionNotification) {
        function smoothFollow() {
            exp_currentX += (exp_targetX - exp_currentX) * 0.1;
            exp_currentY += (exp_targetY - exp_currentY) * 0.1;
            if (accordionNotification) {
                (accordionNotification as HTMLElement).style.transform = `translate(${exp_currentX}px, ${exp_currentY}px)`;
            }
            exp_animationFrameId = requestAnimationFrame(smoothFollow);
        }

        accordionEl.addEventListener('mouseenter', () => {
            if (accordionIsClosed) {
                accordionNotification.classList.add('active');
                exp_animationFrameId = requestAnimationFrame(smoothFollow);
            }
        });

        accordionEl.addEventListener('mousemove', (e) => {
            const rect = accordionEl.getBoundingClientRect();
            const x = e.clientX - rect.left - (accordionNotification as HTMLElement).offsetWidth / 2;
            const y = e.clientY - rect.top - (accordionNotification as HTMLElement).offsetHeight / 2;
            exp_targetX = x;
            exp_targetY = y;
        });

        accordionEl.addEventListener('mouseleave', () => {
            accordionNotification.classList.remove('active');
            cancelAnimationFrame(exp_animationFrameId);
        });

        accordionEl.addEventListener('click', () => {
            accordionNotification.classList.remove('active');
            cancelAnimationFrame(exp_animationFrameId);
        });
    }
}
