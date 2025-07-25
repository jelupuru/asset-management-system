/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { generateNTemplate } from './locale';

export const MapTypes = [
  { label: generateNTemplate('AMap'), value: 'amap' },
  { label: generateNTemplate('Google Maps'), value: 'google' },
];

export const selectedImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAA/CAMAAAC7OkrPAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAEJQTFRFAAAA8Yti8Yti8Itj8Iti74tj8Itj8YtiKwADKwADKhw5Kh07KwADKwADKwADKwAD4odn1YBlKwADKwADKwADKwAD/5y7LQAAABZ0Uk5TAP/8/f/B/PYOHjY3CCozLP3XCSkvMhA05K4AAAC4SURBVHic7dXLDoIwEIXhwSsoLSrw/q8qbSAiMy3/oivj2czmS5omnVORdapVJJFKBSEL2mrrUurbpdXa5dTH5dXi9tTsGNtX0TFG1OT+7PdY2YdEGd0FuFmUwXWm5UAZbCTKYA3SUrXZQTHLHbUy2OlsMO0ultLsajLlbEWZMEUZ+ig5E6YKM2GqMBOmGKubW1D3ps6g1nnvA5uGa5Os85E9nmF2ebYkzeKhc9wre4V+GMeh317hDfXgCWigIGJbAAAAAElFTkSuQmCC';
export const defaultImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAA/CAYAAACM5Lr9AAAFkklEQVR42s3VaWxUVRjG8ddiEKPRxAQTCVSWLnZaWmjpTgulpYUBExP9Agou4IKAogUKAgItlNJCgUIXINFPfsFoDCjibkQRI0QIICAQWUpZugKtpcv0+DxyYqaTe2/vTLf58Etu7znnPf+0k44opQw5i5qsjIFs2APHoBZatFq+02vZeq94yyKs0dOjsAzOTCtuVtNKWtX0UpeaXqHU07tgt4ZnvuMa93Avz/CsniE2WIQV3iEaCDnQ8F/MTgZ4h2d4ljNgmZ4pFszDpmIRIuFP57YWDMcFu7uHMziLMyEKxJBl2MbbM6DZub2NQ3sUZ3K2vkMMGIdNKbi1ADqcZe1q2i7VKzibd8BCEE8GUQ3PQ4ez3KWcGNCbeAfv0neKm85hWRvqo+Hu1LJ2HuwTvAt3tkAciKbDIDO/7iE4l7X9rpqCA30pa3uLwt3nYRAIuIfV5mcWN6msnapf8G405IGQMGry+prB0DiloqPfwng3G3SLDltXnTt5S6PK3NnRr9jAFhDJyLsZAJcz8SGcjOr+xAa0XGGTpOfeSMrYUKcyKlx+gS1oSkbY9VXpm2+rjHKXX2ALm2TS2qq96duaVHp5u19gC5skbc3V05N23FWT8NIfsIVNkra6siGttE2llbX7h9JWhaZ6mfj+lfaJZW3Kn6DJJRNWXWqbgN+Y39jRqtDUKKkrL15PxfdjammrfyhpVmiqlNQVfx9KwX/cFJT6A7awSVLeu1CeUlinxu9o8QsphbUKTWUyfvn5Wcm511QSXvoDtrBJkpedewzaE/E58wdsYZMopSQ55+z+pKK6fo9KKqpXaDkAIgxLWnomK3H1JZVQ0tyv2ICW6XAvLHHJ6QD4K6GgRsVjQ3/g3WzQLffCKGHJqfHgisOXaNy2f/oU7+TdukGIUW5xJ0vic6+oWGzsS7yTd4NoncPiF594GC7FFlSrcVub+gTv4p36btE6h1Fc9nFn7IpzKmZrY5/gXbwTxI0O8xD77rGPYtZeVtE42Jt4B+8C8WAcNu6dPwZDzVh8PYzdcqdXcDbvgMdBPDHEOG7R0Xkxqy6oKAzpDZzNO0AMmIfFvH1kABwZk1epIotv9yjOxOyj+g4xYB4W/dbvlAAdozGsJ3Gmni0mzMPGLvyN6IMo/NojNt/qEZyFmR+CWLAIW3CYaDDUR+D/TTgGdwdncJaeKRbMw8bM/9XdosjlZ5VjU0O3cAZngXTBPCzqzV/cPQAXHeuqVBgu8IVj/TXFGXqWdME8LHLez55mRSw9qUI31fuEZzFjNogNFmFvHPQUACfC8IUbUlTvlbDcSsWzeobYYB42+vWfjDwbnn3c6zCewdnnQGwyD4t47UcjAXA2JO+qCi6ss4V7eUafFZuswn4wM8ex+LgKwqV2cC/OzAXxgnlY+KvfmxkIVaPyr6tRhbWWuId79RnxgnmYY+53VlaHLj2lRm6stRSSc0ph7xoQL1mEzfnWyhPQNrKgGgE1hrjGPTAExEvmYWGvfNOVPUErz6vhiDDCNez5GMQHVmFfd2Vq6MLD6smCGkNc4x4QH5iHPfXyV125H64NX1eFkOpO+I5reo/4wDws9KUDdhSPxFdNIGLc8R3XQHxkFfalHYnB8w6qYRuqO+E7roH4yDws5MX9dtwHlYF5lQi6qYjPfKfXxEcWYbO/sKtsBP50QxFFI/D/De8qQLrBPCwYizY9M2r+of/D+Mx3ID6zDJv1uaVwGfAIBDqGJsbhZ9eQ/BuK+OwYlhzPNe7hXh9Yhe0zwqBB4IAYouCZn1wIXH5GEZ/d1sjBMzzrBfOwoBf2GWFYBMS4C03JWRA087OaoBmf3uCz5zrP8Kx9lmF7jXiE2RbBs95ghB0MIo8/pS0OeJAzvOBLmKY//BAGURBN+jmMa3qPkLdh/wKOL8SpLbnYFgAAAABJRU5ErkJggg==';
