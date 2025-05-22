'use client';
import { useEffect, useMemo } from 'react';
interface RemoverConfig {
    selectors: string[];
    checkInterval?: number;
    debug?: boolean;
}
const defaultConfig: RemoverConfig = {
    selectors: ['.cl-internal-1hp5nqm'],
    checkInterval: 100,
    debug: false
};
export default function ClerkRemover({ config = defaultConfig }: {
    config?: Partial<RemoverConfig>;
}) {
    const mergedConfig = useMemo(() => ({
        ...defaultConfig,
        ...config,
        selectors: [...(config?.selectors || []), ...defaultConfig.selectors]
    }), [config]);
    useEffect(() => {
        const { selectors, checkInterval, debug } = mergedConfig;
        const log = (message: string) => {
            if (debug)
                console.log(`[ClerkRemover]: ${message}`);
        };
        const removeElements = () => {
            let removedCount = 0;
            selectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                if (elements.length > 0) {
                    elements.forEach(el => {
                        el.remove();
                        removedCount++;
                    });
                    if (removedCount > 0 && debug) {
                        log(`Removed ${removedCount} elements with selector: ${selector}`);
                    }
                }
            });
            return removedCount;
        };
        const setupMutationObserver = () => {
            removeElements();
            const observer = new MutationObserver(() => {
                const count = removeElements();
                if (count > 0 && debug) {
                    log(`DOM changed, removed ${count} elements`);
                }
            });
            observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: false,
                characterData: false
            });
            log('MutationObserver started watching for DOM changes');
            const intervalId = setInterval(() => {
                removeElements();
            }, checkInterval);
            return () => {
                observer.disconnect();
                clearInterval(intervalId);
                log('ClerkRemover cleaned up');
            };
        };
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setupMutationObserver);
            return () => {
                document.removeEventListener('DOMContentLoaded', setupMutationObserver);
            };
        }
        else {
            return setupMutationObserver();
        }
    }, [mergedConfig]);
    return null;
}
