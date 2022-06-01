import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'


describe('index.html', () => {
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    let container;

    beforeEach(() => {
        const dom = new JSDOM(html);
        container = dom.window.document.body;
    });

    it('renders layout', () => {
        expect(container.querySelector('header')).not.toBeNull();
        expect(container.querySelector('.info')).not.toBeNull();
        expect(container.querySelector('.calculation')).not.toBeNull();
        expect(container.querySelector('.metrics')).not.toBeNull();
        expect(container.querySelector('.controls')).not.toBeNull();
        expect(container.querySelector('footer')).not.toBeNull();
    });
});
