const { addonBuilder } = require('stremio-addon-sdk');
const fetch = require('node-fetch');

const API_BASE_URL = process.env.SKIP_API_URL || 'http://localhost:3000';

const builder = new addonBuilder({
  id: 'org.stremio.skipintro',
  version: '1.0.0',
  name: 'Skip Intro Recap Addon',
  description: 'Provides streams with skip intro/recap hints',
  resources: ['stream', 'meta'],
  types: ['tv', 'movie'],
  idPrefixes: ['tt']
});

const stubProviders = ['RealDebrid', 'AllDebrid', 'TorBox', 'Premiumize'];

builder.defineStreamHandler(async ({ id }) => {
  // Return stubbed streams with skip hints fetched from API
  // For demo, return a dummy stream with skip hints
  const skipUrl = `${API_BASE_URL}/skip/${id}/s1e1.json`;
  let skipHints = {};
  try {
    const res = await fetch(skipUrl);
    if (res.ok) {
      skipHints = await res.json();
    }
  } catch (e) {
    // ignore fetch errors
  }
  return {
    streams: [
      {
        title: 'Demo Stream',
        url: 'http://example.com/stream.m3u8',
        behaviorHints: {
          skip: skipHints
        },
        sources: stubProviders
      }
    ]
  };
});

module.exports = builder.getInterface();
