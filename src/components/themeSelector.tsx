import React, { useEffect, useRef } from 'react';

const ThemeManager: React.FC = () => {
    const themeWheelRef = useRef<HTMLDivElement>(null);
    const themeOptionsRef = useRef<HTMLDivElement>(null);
    const themeChoicesRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const themeWheel = themeWheelRef.current;
        const themeOptions = themeOptionsRef.current;

        if (themeWheel && themeOptions) {
            themeWheel.addEventListener('click', () => {
                themeOptions.classList.toggle('active');
            });

            themeChoicesRef.current.forEach(theme => {
                theme.addEventListener('click', (e) => {
                    setTheme(e.currentTarget as HTMLDivElement);
                });
            });

            // Close theme options when clicking outside
            document.addEventListener('click', (e) => {
                if (e.target instanceof HTMLElement && !e.target.closest('.theme-wheel') && !e.target.closest('.theme-options')) {
                    themeOptions.classList.remove('active');
                }
            });

        }

        return () => {
            if (themeWheel && themeOptions) {
                themeWheel.removeEventListener('click', () => {
                    themeOptions.classList.toggle('active');
                });

                themeChoicesRef.current.forEach(theme => {
                    theme.removeEventListener('click', (e) => {
                        setTheme(e.currentTarget as HTMLDivElement);
                    });
                });

                document.addEventListener('click', (e) => {
                    if (e.target instanceof HTMLElement && !e.target.closest('.theme-wheel') && !e.target.closest('.theme-options')) {
                        themeOptions.classList.remove('active');
                    }
                });

            }
        };
    }, []);

    const setTheme = (themeElement: HTMLDivElement) => {
        // Remove all theme classes
        document.body.classList.remove('theme-blue-active', 'theme-purple-active', 'theme-green-active', 'theme-orange-active', 'theme-pink-active');
        
        // Remove active class from all options
        themeChoicesRef.current.forEach(t => t.classList.remove('active'));
        
        // Add active class to selected theme
        themeElement.classList.add('active');
        
        // Add theme class to body
        const themeClass = Array.from(themeElement.classList)
            .find(className => className.startsWith('theme-') && className !== 'theme-option');
        if (themeClass) {
            document.body.classList.add(`${themeClass}-active`);
        }
    };

    return (
        <div>
            <div className="theme-wheel" ref={themeWheelRef}>
                <svg viewBox="0 0 24 24">
                    <path d="M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9c0.83,0,1.5-0.67,1.5-1.5c0-0.39-0.15-0.74-0.39-1.01c-0.23-0.26-0.38-0.61-0.38-0.99 c0-0.83,0.67-1.5,1.5-1.5H16c2.76,0,5-2.24,5-5C21,7.07,16.97,3,12,3z M6.5,12c-0.83,0-1.5-0.67-1.5-1.5S5.67,9,6.5,9 S8,9.67,8,10.5S7.33,12,6.5,12z M9.5,8C8.67,8,8,7.33,8,6.5S8.67,5,9.5,5S11,5.67,11,6.5S10.33,8,9.5,8z M14.5,8 C13.67,8,13,7.33,13,6.5S13.67,5,14.5,5S16,5.67,16,6.5S15.33,8,14.5,8z M17.5,12c-0.83,0-1.5-0.67-1.5-1.5S16.67,9,17.5,9 S19,9.67,19,10.5S18.33,12,17.5,12z"/>
                </svg>
            </div>
            <div className="theme-options" ref={themeOptionsRef}>
                {['blue', 'purple', 'green', 'orange', 'pink'].map((color, index) => (
                    <div
                        key={color}
                        className={`theme-option theme-${color} ${index === 0 ? 'active' : ''}`}
                        ref={el => {
                            if (el && !themeChoicesRef.current.includes(el)) {
                                themeChoicesRef.current.push(el);
                            }
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default ThemeManager;
