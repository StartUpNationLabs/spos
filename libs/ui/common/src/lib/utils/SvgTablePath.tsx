import React from 'react';

interface TablePath {
  index: number;
  path: string;
  text: string; 
}

interface TablePathsProps {
    handleTableClick: (index: number) => void;
    getTableColor: (index: number) => string;
    userTableIndex: number;
}
  

const tablePaths: TablePath[] = [
  {
    index: 0,
    path:  `M183 2921 c-45 -32 -113 -111 -113 -131 0 -6 22 -32 49 -56 48 -43
    49 -46 49 -102 0 -53 -3 -60 -41 -99 -23 -24 -47 -43 -54 -43 -39 0 18 -91 92
    -148 42 -32 75 -41 75 -22 0 6 19 31 41 55 40 43 44 45 99 45 57 0 59 -1 105
    -52 l46 -52 36 20 c41 21 136 130 130 148 -2 6 -14 16 -26 22 -12 6 -35 24
    -52 40 -25 24 -29 35 -29 84 0 53 2 58 43 98 23 23 48 42 55 42 7 0 12 11 12
    25 0 35 -120 155 -155 155 -14 0 -25 -6 -25 -13 0 -7 -18 -31 -40 -52 -37 -37
    -44 -39 -100 -40 -54 -1 -63 2 -89 30 -16 16 -34 40 -40 53 -15 28 -20 28 -68
    -7z m416 -20 c34 -26 91 -96 91 -113 0 -5 -34 26 -75 67 -94 96 -98 108 -16
    46z m-439 -51 c-40 -39 -74 -69 -76 -67 -9 8 58 88 98 117 22 17 43 28 45 26
    2 -2 -28 -36 -67 -76z m439 -1 c34 -33 61 -64 61 -68 0 -4 -15 -22 -34 -40
    -33 -32 -56 -35 -56 -7 0 15 -77 90 -101 98 -10 4 -5 15 20 42 19 20 38 36 42
    36 4 0 35 -27 68 -61z m-325 22 c28 -29 28 -51 2 -51 -14 0 -70 -59 -93 -96
    -11 -18 -13 -18 -43 13 l-33 31 21 30 c24 33 98 102 110 102 5 0 21 -13 36
    -29z m218 -77 c187 -131 43 -425 -173 -354 -49 17 -114 85 -130 138 -52 175
    154 321 303 216z m-219 -347 l38 -20 -37 -38 c-21 -22 -41 -39 -44 -39 -6 1
    -66 56 -104 98 l-30 32 38 39 39 39 31 -46 c17 -25 48 -54 69 -65z m351 74
    c22 -23 26 -33 18 -48 -13 -23 -108 -113 -120 -113 -4 0 -23 15 -41 34 -32 33
    -32 34 -12 41 31 9 79 53 97 86 18 36 24 36 58 0z m21 -97 c-41 -50 -111 -101
    -123 -90 -4 4 2 12 13 18 11 6 47 39 80 73 67 70 88 70 30 -1z m-542 33 c16
    -25 78 -86 112 -111 11 -8 17 -17 13 -21 -17 -17 -158 117 -158 149 0 14 19 4
    33 -17z `,
    text: 'YOU',
  },
  {
    index: 1,
    path: `M1265 2911 c-83 -64 -131 -151 -82 -151 7 0 28 -16 47 -35 30 -31 34
    -41 34 -91 1 -56 1 -57 -58 -111 l-58 -54 26 -39 c29 -43 119 -120 142 -120 8
    0 17 7 21 16 3 9 23 34 43 55 35 37 40 39 96 39 56 0 62 -2 97 -38 20 -21 37
    -43 37 -50 0 -37 93 20 149 92 35 44 40 74 14 83 -10 3 -33 20 -50 36 -30 28
    -33 37 -33 88 0 56 1 58 56 108 66 61 66 67 -12 145 -77 79 -92 80 -151 16
    -47 -51 -49 -52 -107 -53 l-59 -2 -46 52 c-25 29 -48 53 -51 53 -3 0 -28 -18
    -55 -39z m421 -2 c47 -37 65 -56 88 -92 29 -43 2 -31 -37 16 -19 24 -51 54
    -71 68 -34 23 -46 39 -27 39 4 0 26 -14 47 -31z m-356 13 c0 -5 -17 -21 -37
    -36 -21 -16 -51 -46 -68 -67 -29 -37 -45 -48 -45 -30 0 14 61 85 99 114 35 28
    51 33 51 19z m363 -70 c31 -32 57 -62 57 -68 0 -5 -15 -25 -34 -43 l-34 -33
    -16 29 c-18 36 -81 93 -101 93 -8 0 -15 3 -15 7 0 12 63 73 75 73 6 0 36 -26
    68 -58z m-317 17 c16 -18 25 -33 19 -35 -48 -18 -101 -71 -119 -119 -4 -13
    -66 44 -66 62 0 7 25 37 55 68 31 30 61 55 68 55 7 0 26 -14 43 -31z m216 -74
    c79 -56 109 -164 69 -244 -75 -146 -259 -159 -351 -26 -25 36 -30 53 -30 103
    0 86 35 142 115 186 49 27 144 17 197 -19z m-267 -310 c22 -22 48 -44 58 -50
    16 -9 15 -14 -21 -48 l-38 -37 -37 31 c-19 17 -48 46 -62 65 l-27 35 34 38
    c28 33 34 36 43 22 6 -9 28 -34 50 -56z m425 4 c0 -9 -121 -129 -130 -129 -3
    0 -21 16 -40 35 l-33 34 26 10 c32 12 86 67 98 100 l10 24 34 -33 c19 -19 35
    -37 35 -41z m30 -6 c0 -24 -127 -153 -151 -153 -19 0 -7 16 35 50 24 19 56 52
    72 73 25 34 44 47 44 30z m-482 -127 c45 -32 25 -42 -21 -10 -38 25 -107 109
    -107 128 0 6 22 -13 48 -42 26 -29 62 -63 80 -76z`, 
    text: 'YOU',
  },
  {
    index: 2,
    path: `M2367 2915 c-44 -33 -107 -107 -107 -127 0 -5 23 -30 51 -56 49 -45
    51 -50 53 -101 1 -53 0 -54 -57 -107 -57 -53 -58 -54 -43 -82 21 -40 123 -132
    147 -132 11 0 22 8 26 18 3 9 22 34 41 55 33 34 40 37 93 37 56 0 58 -1 102
    -50 25 -27 51 -50 59 -50 20 0 113 84 138 125 18 29 20 38 10 50 -7 8 -16 15
    -21 15 -5 0 -23 14 -41 30 -29 28 -31 34 -29 93 2 57 5 65 39 100 20 20 42 37
    49 37 7 0 13 11 13 26 0 18 -18 44 -64 90 -46 46 -72 64 -90 64 -15 0 -26 -6
    -26 -13 0 -7 -18 -30 -40 -52 -36 -35 -44 -39 -97 -40 -52 -1 -61 2 -88 29
    -16 17 -34 40 -40 50 -15 30 -26 28 -78 -9z m448 -40 c36 -35 65 -71 65 -80 0
    -8 -34 20 -75 62 -41 42 -75 77 -75 79 0 16 30 -6 85 -61z m-385 45 c0 -5 -5
    -10 -10 -10 -6 0 -40 -30 -76 -66 -36 -37 -67 -64 -70 -62 -8 9 67 98 104 123
    40 27 52 31 52 15z m330 -40 c20 -16 50 -46 65 -66 l27 -36 -33 -34 c-18 -19
    -36 -34 -39 -34 -3 0 -14 16 -25 36 -11 20 -38 48 -60 62 -22 15 -42 28 -44
    29 -5 3 60 73 67 73 2 0 21 -13 42 -30z m-291 -14 l32 -33 -30 -13 c-34 -14
    -86 -67 -96 -99 -6 -20 -9 -19 -40 15 l-35 36 21 29 c20 29 98 99 109 99 3 0
    21 -15 39 -34z m189 -55 c72 -37 112 -102 112 -183 -1 -141 -156 -242 -277
    -180 -162 83 -158 291 7 369 39 18 116 15 158 -6z m-253 -314 c11 -17 37 -39
    58 -50 l39 -20 -40 -40 -41 -40 -38 34 c-22 19 -51 49 -66 68 l-27 35 37 38
    c33 34 39 37 48 22 6 -9 19 -30 30 -47z m411 24 l33 -30 -51 -56 c-73 -81 -83
    -84 -124 -44 l-34 33 33 18 c35 17 97 81 97 98 0 16 11 12 46 -19z m30 -86
    c-31 -40 -114 -110 -122 -102 -3 2 28 38 68 78 74 75 102 87 54 24z m-501 -32
    c76 -77 91 -103 36 -64 -54 38 -138 141 -116 141 2 0 38 -34 80 -77z`, 
    text: 'YOU',
  }, {
    index: 3,
    path: `M178 1827 c-80 -61 -137 -157 -94 -157 7 0 29 -17 49 -38 34 -34 37
    -43 37 -92 0 -50 -4 -59 -39 -96 -22 -23 -46 -44 -55 -47 -9 -4 -16 -13 -16
    -21 0 -23 73 -108 120 -141 41 -29 43 -29 54 -11 6 11 28 38 48 61 36 40 38
    41 98 39 55 -1 65 -5 96 -35 18 -18 34 -39 34 -46 0 -49 91 8 155 96 l34 46
    -55 48 c-54 48 -54 49 -54 107 0 58 0 58 55 108 30 28 55 53 55 57 0 4 -13 26
    -30 50 -49 71 -150 133 -150 92 0 -7 -19 -31 -42 -53 -40 -37 -47 -40 -100
    -39 -51 0 -61 4 -93 35 -19 18 -35 39 -35 46 0 26 -31 22 -72 -9z m1 -46 c-30
    -26 -61 -60 -68 -75 -8 -14 -18 -26 -23 -26 -29 0 26 77 91 126 64 49 64 32 0
    -25z m421 28 c36 -29 90 -96 90 -112 0 -18 -21 -3 -40 29 -13 19 -45 53 -72
    75 -29 23 -43 39 -33 39 9 0 34 -14 55 -31z m0 -54 l64 -65 -39 -40 -39 -40
    -14 27 c-21 40 -60 80 -94 94 l-29 12 37 38 c21 22 41 39 44 39 3 0 35 -29 70
    -65z m-321 21 l32 -33 -30 -13 c-35 -14 -86 -67 -96 -100 -7 -21 -8 -21 -41
    11 -19 18 -34 37 -34 42 0 13 111 127 125 127 6 0 26 -15 44 -34z m164 -47
    c76 -21 137 -107 137 -192 0 -142 -165 -242 -290 -175 -118 64 -146 217 -57
    310 59 62 127 80 210 57z m-202 -353 c24 -20 49 -36 58 -36 9 0 1 -15 -24 -40
    -21 -22 -42 -40 -45 -40 -12 0 -78 61 -106 97 l-26 35 38 39 39 40 12 -29 c7
    -16 31 -46 54 -66z m381 57 c15 -15 28 -32 28 -38 0 -13 -112 -125 -125 -125
    -11 1 -75 56 -75 65 0 3 6 5 13 5 20 0 97 70 108 96 11 30 17 30 51 -3z m27
    -94 c-32 -40 -103 -99 -121 -99 -4 0 27 35 70 78 80 81 107 92 51 21z m-540
    16 c13 -20 46 -54 73 -77 58 -48 56 -63 -3 -22 -39 27 -109 107 -109 125 0 18
    16 7 39 -26z`,
    text: 'YOU',
  }, {
    index: 4,
    path: `M1622 1858 c-7 -7 -12 -15 -12 -19 0 -4 -17 -24 -37 -45 -35 -36 -41
    -39 -96 -39 -60 0 -60 0 -108 54 l-48 53 -45 -33 c-48 -34 -116 -113 -116
    -135 0 -7 9 -18 21 -25 12 -6 35 -24 52 -40 27 -26 31 -36 31 -88 0 -55 -3
    -61 -40 -98 -21 -22 -47 -43 -56 -46 -10 -4 -18 -14 -18 -23 0 -21 133 -154
    155 -154 9 0 38 24 64 53 l48 52 62 0 c58 0 64 -3 94 -36 18 -20 37 -45 43
    -55 10 -18 13 -17 54 11 43 30 120 118 120 137 0 5 -22 30 -50 55 -50 45 -50
    45 -50 106 l0 62 55 45 c30 25 55 50 55 55 -1 15 -61 90 -95 118 -48 39 -70
    48 -83 35z m77 -54 c59 -53 95 -100 83 -108 -5 -3 -23 14 -41 37 -18 23 -50
    56 -71 72 -22 17 -39 33 -40 38 -1 16 21 5 69 -39z m-369 27 c0 -4 -18 -20
    -39 -34 -21 -14 -54 -46 -71 -71 -18 -25 -37 -43 -42 -40 -12 8 24 55 83 108
    50 45 69 55 69 37z m362 -69 c32 -33 58 -63 58 -68 -1 -5 -16 -27 -35 -48 -31
    -34 -35 -37 -41 -20 -13 36 -55 84 -90 102 l-35 18 33 36 c18 20 37 36 42 37
    5 1 35 -25 68 -57z m-322 18 c19 -16 32 -31 30 -33 -3 -2 -22 -14 -43 -26 -20
    -13 -49 -43 -63 -67 -15 -25 -27 -44 -28 -42 0 2 -16 19 -34 39 l-33 36 60 62
    c34 33 64 61 68 61 5 0 24 -13 43 -30z m212 -71 c88 -63 120 -154 83 -242 -20
    -49 -97 -114 -145 -122 -133 -22 -240 66 -240 200 0 64 28 117 82 158 42 32
    61 37 130 32 40 -2 67 -10 90 -26z m-288 -282 c15 -23 44 -53 64 -67 20 -13
    39 -26 41 -27 4 -3 -5 -12 -56 -56 -22 -19 -22 -18 -73 29 -75 70 -78 78 -38
    124 18 21 33 39 34 39 1 1 13 -18 28 -42z m423 1 l33 -32 -62 -63 c-34 -35
    -66 -63 -70 -63 -16 0 -73 63 -61 67 32 11 92 65 104 92 8 17 16 31 18 31 3 0
    20 -14 38 -32z m43 -66 c-49 -67 -124 -131 -137 -118 -3 3 -4 7 -2 9 41 28
    101 83 119 110 14 20 28 33 32 31 5 -3 -1 -17 -12 -32z m-440 -128 c0 -14 -67
    37 -106 80 -73 80 -49 80 31 0 41 -41 75 -77 75 -80z`, 
    text: 'YOU',
  }, {
    index: 5,
    path: `M2368 1825 c-76 -58 -136 -155 -95 -155 7 0 30 -17 50 -38 34 -35 37
    -43 37 -94 0 -52 -3 -60 -37 -95 -21 -22 -46 -42 -55 -46 -25 -9 -22 -27 13
    -75 25 -34 116 -112 131 -112 2 0 26 26 52 58 l48 58 60 -2 c52 -1 63 -5 94
    -35 18 -18 34 -39 34 -46 0 -46 86 2 148 82 45 59 48 73 21 84 -13 5 -39 24
    -56 43 -29 30 -33 40 -32 88 1 50 5 59 42 98 23 23 47 42 54 42 22 0 14 35
    -17 78 -51 71 -150 129 -150 89 0 -7 -18 -31 -40 -52 -37 -37 -44 -39 -100
    -40 -54 -1 -63 2 -89 30 -16 16 -34 40 -40 53 -15 29 -20 28 -73 -13z m36 -18
    c-24 -13 -73 -63 -101 -102 -12 -16 -25 -27 -29 -23 -4 4 6 26 22 50 33 46
    117 113 123 96 2 -6 -5 -15 -15 -21z m392 -2 c45 -38 91 -102 79 -113 -3 -4
    -11 2 -17 13 -6 11 -37 46 -70 78 -65 63 -60 78 8 22z m-7 -46 c33 -33 61 -64
    61 -68 0 -4 -17 -24 -39 -45 l-38 -38 -7 25 c-7 29 -91 107 -114 107 -11 0 -3
    14 23 40 21 22 42 40 46 40 3 0 34 -27 68 -61z m-320 17 l32 -33 -31 -13 c-34
    -14 -77 -60 -91 -99 l-10 -24 -34 33 c-19 19 -35 38 -35 43 0 11 116 127 127
    127 5 0 24 -15 42 -34z m220 -74 c49 -40 81 -104 81 -164 0 -194 -252 -271
    -362 -110 -61 88 -37 217 52 276 49 32 65 36 135 30 46 -3 67 -10 94 -32z
    m-227 -347 l38 -21 -40 -39 -39 -39 -23 20 c-32 28 -60 55 -88 87 l-24 27 38
    39 39 39 31 -46 c17 -26 48 -56 68 -67z m350 78 c15 -15 28 -32 28 -38 0 -14
    -112 -125 -126 -125 -6 0 -23 14 -39 30 -25 26 -27 32 -15 40 8 5 18 10 21 10
    12 0 72 66 80 87 11 29 17 29 51 -4z m34 -88 c-30 -38 -114 -110 -121 -103 -3
    3 27 38 67 79 73 75 102 88 54 24z m-541 4 c23 -32 56 -63 114 -106 2 -2 2 -6
    -2 -9 -16 -16 -157 116 -157 147 0 20 19 7 45 -32z`,
    text: 'YOU',
  }, {
    index: 6,
    path: `M519 749 c-6 -12 -27 -37 -46 -56 -30 -31 -41 -35 -90 -36 -55 -2
    -56 -1 -104 51 -26 28 -52 52 -58 52 -15 0 -124 -104 -144 -139 l-18 -30 28
    -18 c63 -40 82 -70 82 -130 0 -52 -3 -60 -38 -93 -21 -20 -45 -39 -54 -43 -9
    -3 -17 -15 -17 -26 0 -24 79 -113 126 -142 l35 -21 50 56 51 56 61 0 c57 0 65
    -3 93 -33 17 -17 34 -40 37 -49 4 -10 12 -18 19 -18 25 1 105 68 136 116 l32
    48 -55 49 c-53 47 -55 50 -55 100 0 46 5 56 39 93 22 23 46 44 55 47 26 10 19
    40 -21 87 -36 42 -108 100 -124 100 -5 0 -13 -10 -20 -21z m-356 -85 c-75 -75
    -104 -91 -64 -35 29 41 121 122 131 116 5 -3 -25 -39 -67 -81z m463 22 c35
    -35 64 -72 64 -83 0 -13 -11 -5 -40 29 -22 26 -59 63 -83 82 -31 26 -37 36
    -24 36 11 0 48 -29 83 -64z m-8 -40 c23 -25 39 -51 36 -58 -3 -7 -21 -26 -39
    -41 l-34 -28 -17 36 c-18 39 -55 72 -90 81 -23 6 -23 7 14 49 l37 43 26 -18
    c14 -10 44 -39 67 -64z m-344 38 c20 -20 35 -37 34 -38 -48 -20 -87 -49 -108
    -82 l-26 -42 -32 29 c-18 16 -32 33 -32 38 0 8 117 131 125 131 2 0 19 -16 39
    -36z m196 -59 c85 -44 133 -163 100 -249 -18 -49 -80 -105 -132 -121 -125 -37
    -258 61 -258 190 0 63 50 148 104 177 53 29 133 30 186 3z m-280 -279 c0 -20
    68 -85 95 -92 14 -3 25 -8 25 -10 0 -3 -16 -20 -36 -39 -24 -24 -42 -34 -54
    -30 -10 3 -41 31 -70 61 l-53 56 38 38 c37 38 55 43 55 16z m398 -112 l-67
    -65 -36 35 c-39 40 -42 46 -18 46 26 0 79 46 98 86 l17 37 37 -37 36 -37 -67
    -65z m92 56 c0 -21 -101 -125 -133 -136 -34 -11 -27 2 17 35 24 18 57 50 72
    72 29 38 44 48 44 29z m-526 -75 c42 -42 68 -75 60 -75 -18 0 -144 122 -144
    139 0 18 7 14 84 -64z`, 
    text: 'YOU',
  }, {
    index: 7,
    path: `M1584 712 l-51 -57 -57 1 c-49 1 -62 6 -88 30 -16 16 -34 39 -39 52
    -5 12 -15 22 -22 22 -37 0 -167 -129 -167 -166 0 -7 8 -15 18 -18 10 -4 33
    -22 51 -40 30 -31 34 -41 34 -91 0 -52 -4 -60 -39 -96 -21 -21 -43 -39 -50
    -39 -25 0 -24 -33 2 -69 65 -88 164 -147 164 -97 0 6 17 29 38 49 36 35 41 37
    105 37 37 0 67 -3 67 -7 1 -5 19 -28 40 -51 l39 -44 35 22 c45 27 126 117 126
    139 0 9 -22 34 -50 56 l-50 40 0 60 c0 57 2 63 38 97 20 19 45 38 55 41 26 10
    21 36 -20 85 -33 40 -107 102 -122 102 -3 0 -29 -26 -57 -58z m-270 5 c-28
    -15 -118 -106 -112 -113 3 -3 33 23 67 57 l61 63 35 -34 c41 -40 43 -46 13
    -55 -30 -9 -76 -52 -95 -89 l-16 -30 -36 40 c-20 21 -39 38 -43 36 -13 -4 -9
    9 13 45 27 44 122 120 127 103 3 -7 -4 -17 -14 -23z m392 -11 c42 -37 94 -106
    81 -106 -2 0 -38 34 -80 75 -82 80 -82 105 -1 31z m7 -57 c21 -23 37 -47 37
    -53 0 -7 -15 -27 -33 -44 l-34 -33 -28 45 c-15 24 -45 54 -67 66 l-40 22 38
    39 37 38 27 -19 c15 -10 43 -38 63 -61z m-142 -25 c34 -17 78 -69 97 -114 49
    -117 -55 -260 -189 -260 -61 0 -96 13 -137 53 -48 46 -62 78 -62 145 0 93 59
    169 150 194 33 9 108 -1 141 -18z m-281 -284 c13 -33 76 -90 97 -90 7 0 13 -3
    13 -7 0 -11 -63 -73 -75 -73 -13 0 -89 71 -111 105 -17 26 -16 27 16 60 19 19
    37 35 41 35 4 0 12 -14 19 -30z m450 -50 c-5 -10 -35 -41 -66 -69 l-57 -52
    -33 32 c-37 36 -42 49 -19 49 20 0 83 57 101 93 l16 29 33 -32 c26 -25 32 -37
    25 -50z m23 -21 c-22 -38 -110 -119 -129 -119 -13 0 124 147 139 149 5 1 0
    -13 -10 -30z m-548 -18 c17 -21 47 -51 68 -67 38 -28 47 -44 25 -44 -15 0
    -138 125 -138 139 0 20 15 10 45 -28z`,
    text: 'YOU',
  },
  {
    index: 8,
    path: `M2710 748 c-5 -13 -25 -38 -44 -57 -32 -30 -42 -33 -93 -33 -57 0
    -58 0 -105 53 -46 51 -49 52 -74 39 -39 -21 -134 -128 -134 -151 0 -11 10 -23
    23 -28 12 -5 35 -23 51 -39 24 -26 29 -39 29 -87 0 -52 -4 -60 -39 -96 -21
    -21 -44 -39 -51 -39 -43 0 -12 -71 56 -133 73 -66 76 -66 133 -3 l50 56 62 0
    c57 0 65 -3 93 -33 16 -17 33 -40 36 -49 4 -10 13 -18 20 -18 32 0 125 85 161
    148 6 9 -9 29 -44 60 -52 47 -52 48 -52 107 0 59 0 60 51 107 28 26 51 53 51
    61 0 23 -64 97 -110 128 -52 35 -58 35 -70 7z m-357 -84 c-75 -75 -104 -91
    -64 -35 29 41 121 122 131 116 5 -3 -25 -39 -67 -81z m434 54 c50 -44 81 -79
    89 -101 11 -34 -2 -27 -35 17 -18 24 -50 57 -72 72 -21 16 -39 32 -39 37 0 15
    21 6 57 -25z m11 -62 c28 -30 52 -58 52 -61 0 -9 -66 -75 -74 -75 -3 0 -6 7
    -6 15 0 20 -85 105 -105 105 -22 0 -19 8 18 50 38 44 43 42 115 -34z m-332 32
    c37 -36 42 -48 19 -48 -20 0 -83 -57 -101 -93 l-16 -29 -34 33 c-19 18 -34 36
    -34 40 0 8 120 129 128 129 3 0 20 -15 38 -32z m206 -70 c73 -41 111 -131 94
    -221 -4 -20 -24 -55 -47 -81 -89 -101 -234 -91 -313 22 -25 35 -30 52 -30 104
    -1 73 18 114 76 161 64 51 145 57 220 15z m-253 -320 c18 -21 44 -41 57 -44
    31 -8 30 -14 -10 -53 -43 -42 -59 -37 -126 36 l-51 56 38 39 c34 35 39 37 48
    22 6 -10 25 -35 44 -56z m420 5 c1 -7 -27 -40 -61 -73 -33 -33 -56 -60 -50
    -60 14 0 91 74 115 109 9 14 20 22 24 18 10 -11 -49 -87 -94 -119 l-39 -29
    -47 47 c-26 26 -47 48 -47 50 0 2 9 4 20 4 24 0 110 82 110 106 0 12 8 10 34
    -13 19 -15 35 -34 35 -40z m-512 -72 c29 -33 62 -63 73 -66 22 -7 27 -25 7
    -25 -18 0 -109 83 -130 119 -28 47 -10 37 50 -28z`,
    text: 'YOU',
  },
];
/*
export const TablePaths: React.FC<TablePathsProps> = ({ handleTableClick, getTableColor }) => {
  return (
    <>
      {tablePaths.map(({ index, path, text }) => (
        <g key={index} onClick={() => handleTableClick(index)} pointerEvents="bounding-box">
          <path d={path} fill={getTableColor(index)} aria-label={`Table ${index}`} />
          
          
        </g>
      ))}
    </>
  );
};*/

import TableSvg from './uniqueSvgTable';
import { Typography } from '@mui/material';

export const TablesSvgGrid: React.FC<TablePathsProps> = ({ handleTableClick, getTableColor,userTableIndex }) => {
  
  const userTableIndex2 = 2; 

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        aspectRatio: '1/1',
        gap: '0.2rem',
      }}
    >
      {Array.from({ length: 9 }, (_, index) => {
        const isCurrentTable = index + 1 === userTableIndex; 
        return (
          <div
            key={index}
            style={{
              aspectRatio: '1/1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'scale(1.2)',
            }}
          >
            {isCurrentTable ? (
              <>
                <TableSvg 
                  index={index + 1}
                  handleTableClick={handleTableClick} 
                  getTableColor={getTableColor} 
                  isCurrentTable={true}
                />
                <Typography variant="body1" style={{fontSize: '45px', position: 'absolute', textAlign: 'center', color: '#87CEFA' }}>
                  YOU
                </Typography>
              </>
            ) : (
              <TableSvg 
                index={index + 1}
                handleTableClick={handleTableClick} 
                getTableColor={getTableColor} 
                isCurrentTable={false}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

