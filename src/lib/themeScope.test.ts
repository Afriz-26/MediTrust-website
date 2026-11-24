import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_SITE_ACCENT,
  isAccentId,
  resolveAccent,
  routeKey,
  sanitizePageAccents,
  setPageAccent,
} from './themeScope';

test('a page without an override uses the site-wide accent', () => {
  const resolved = resolveAccent('indigo', {}, '/medicines');
  assert.equal(resolved.accent, 'indigo');
  assert.equal(resolved.source, 'site');
});

test('a page override applies to that page only', () => {
  const pageAccents = setPageAccent({}, '/medicines', 'rose');

  const onPage = resolveAccent('indigo', pageAccents, '/medicines');
  assert.equal(onPage.accent, 'rose');
  assert.equal(onPage.source, 'page');

  const onOtherPage = resolveAccent('indigo', pageAccents, '/doctors');
  assert.equal(onOtherPage.accent, 'indigo');
  assert.equal(onOtherPage.source, 'site');
});

test('page overrides ignore trailing slashes and can be cleared', () => {
  const withOverride = setPageAccent({}, '/medicines', 'amber');
  assert.equal(resolveAccent('teal', withOverride, '/medicines/').accent, 'amber');

  const cleared = setPageAccent(withOverride, '/medicines/', null);
  assert.deepEqual(cleared, {});
  assert.equal(resolveAccent('teal', cleared, '/medicines').accent, 'teal');
});

test('routeKey normalises the root path', () => {
  assert.equal(routeKey('/'), '/');
  assert.equal(routeKey(''), '/');
  assert.equal(routeKey('/medicines//'), '/medicines');
});

test('sanitizePageAccents drops corrupt or unknown stored values', () => {
  const sanitized = sanitizePageAccents({
    '/medicines': 'rose',
    '/doctors/': 'violet',
    '/bad': 'chartreuse',
    'not-a-path': 'teal',
  });
  assert.deepEqual(sanitized, { '/medicines': 'rose', '/doctors': 'violet' });
  assert.deepEqual(sanitizePageAccents(null), {});
  assert.deepEqual(sanitizePageAccents('nope'), {});
});

test('isAccentId accepts only known accents and the default stays the brand teal', () => {
  assert.equal(isAccentId('teal'), true);
  assert.equal(isAccentId('cyan'), true);
  assert.equal(isAccentId('chartreuse'), false);
  assert.equal(isAccentId(null), false);
  assert.equal(DEFAULT_SITE_ACCENT, 'teal');
});
