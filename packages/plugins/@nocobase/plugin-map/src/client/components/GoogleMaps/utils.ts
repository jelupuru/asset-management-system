/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export const getIcon = (url) => {
  return {
    url,
    scaledSize: {
      width: 19,
      height: 32,
    },
    labelOrigin: new google.maps.Point(19 / 2, 32 + 10),
  } as google.maps.Icon;
};

export const getCurrentPosition: () => Promise<{ lat: number; lng: number }> = () => {
  return new Promise((resolve) => {
    const defaultLatLng = () => {
      // google company lat and lng
      resolve({ lat: 17.436258513036584, lng: 78.45526345335591 });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ lat: latitude, lng: longitude });
        },
        () => {
          defaultLatLng();
        },
        {
          timeout: 2000, // 设置最大等待时间，单位毫秒
          maximumAge: 0, // 不使用缓存的地理位置
        },
      );
    } else {
      defaultLatLng();
    }
  });
};
