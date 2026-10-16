import test from 'node:test';
import assert from 'node:assert/strict';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {ProductGallery} from '../src/components/catalogue/gallery';
test('gallery renders supplied unique images with descriptive alt text and full-image links',()=>{
 const html=renderToStaticMarkup(createElement(ProductGallery,{name:'Rack',images:[{src:'/images/fixture-front.webp',alt:'Front elevation of rack',source:'Test fixture only'},{src:'/images/fixture-side.webp',alt:'Side elevation of rack',source:'Test fixture only'}]}));
 assert.match(html,/Front elevation of rack/);assert.match(html,/Side elevation of rack/);assert.match(html,/href="\/images\/fixture-front.webp"/);
});
test('gallery never inserts a shared fallback image',()=>{assert.equal(renderToStaticMarkup(createElement(ProductGallery,{name:'Rack',images:[]})),'');});
