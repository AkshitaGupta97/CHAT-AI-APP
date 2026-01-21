
export const dummyUserData = {
  "_id": "64f1a2c9b7e3d5a9f0c12345",
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "hashed_password_123",
  "credits": 100
}

export const dummyPlans = [
  {
    "_id": "plan_basic_001",
    "name": "Basic Plan",
    "price": 9.99,
    "credits": 100,
    "features": [
      "Access to standard tools",
      "Email support",
      "Single device usage"
    ]
  },
  {
    "_id": "plan_pro_002",
    "name": "Pro Plan",
    "price": 29.99,
    "credits": 500,
    "features": [
      "Priority support",
      "Multi-device access",
      "Advanced analytics",
      "Customizable settings"
    ]
  },
  {
    "_id": "plan_enterprise_003",
    "name": "Enterprise Plan",
    "price": 99.99,
    "credits": 2000,
    "features": [
      "Dedicated account manager",
      "Unlimited device usage",
      "API access",
      "Advanced security features",
      "Team collaboration tools"
    ]
  }
]

export const dummyChats = [
  {
    "_id": "chat_001",
    "userId": "user_101",
    "userName": "Alice",
    "name": "SupportBot",
    "messages": [
      {
        "isImage": true,
        "text": "Hi Alice, how can I help you today?",
        "timestamp": "2026-01-20T10:00:00Z",
      },
      {
        "isImage": false,
        "text": "Do you need assistance with your account?",
        "timestamp": "2026-01-20T10:01:00Z"
      }
    ]
  },
  {
    "_id": "chat_002",
    "userId": "user_102",
    "userName": "Bob",
    "name": "SupportBot",
    "messages": [
      {
        "isImage": true,
        "text": "Uploaded a screenshot of the error",
        "timestamp": "2026-01-20T11:15:00Z",
        "imageUrl": "https://img.freepik.com/premium-psd/png-animated-girl-using-laptop_53876-191180.jpg"
      },
      {
        "isImage": false,
        "text": "```js\nconsole.error('Unexpected token < in JSON');\n```",
        "timestamp": "2026-01-20T11:16:00Z"
      }
    ]
  },
  {
    "_id": "chat_003",
    "userId": "user_103",
    "userName": "Charlie",
    "name": "SupportBot",
    "messages": [
      {
        "isImage": false,
        "text": "Can you explain the pricing plans?",
        "timestamp": "2026-01-20T12:30:00Z",
        "role": "user"
      },
      {
        "isImage": false,
        "text": "```python\ndef calculate_price(plan):\n    if plan == 'Basic':\n        return 10\n    elif plan == 'Pro':\n        return 25\n```",
        "timestamp": "2026-01-20T12:31:00Z"
      }
    ]
  },
  {
    "_id": "chat_004",
    "userId": "user_104",
    "userName": "Diana",
    "name": "SupportBot",
    "messages": [
      {
        "isImage": true,
        "text": "Shared a photo of the product issue",
        "timestamp": "2026-01-20T13:45:00Z"
      },
      {
        "isImage": false,
        "text": "```html\n<div class=\"error\">Product stopped working</div>\n```",
        "timestamp": "2026-01-20T13:46:00Z"
      }
    ]
  },
  {
    "_id": "chat_005",
    "userId": "user_105",
    "userName": "Ethan",
    "name": "SupportBot",
    "messages": [
      {
        "isImage": false,
        "text": "Thanks for resolving my problem!",
        "timestamp": "2026-01-20T14:10:00Z",
      },
      {
        "isImage": false,
        "text": "```sql\nSELECT * FROM users WHERE status = 'active';\n```",
        "timestamp": "2026-01-20T14:11:00Z"
      }
    ]
  }
];

export const dummyPublishedImages = [
  {
    id: 1,
    userName: "Bob",
    title: 'Nature Landscape',
    imageUrl: 'https://cdn.pixabay.com/photo/2017/12/08/11/28/nature-3005607_960_720.jpg',
    publishedAt: '2025-01-05',
    isPublished: true
  },
  {
    id: 2,
    title: 'Modern City',
    userName: "Alice",
    imageUrl: 'https://tse1.explicit.bing.net/th/id/OIP.smGmbUIpZO7w8O_aB1qOCgHaEo?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3',
    publishedAt: '2025-01-10',
    isPublished: true
  },
  {
    id: 3,
    title: 'Ocean View',
    userName: "Sam",
    imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.HjWcut1nuKMUdWSMTqu-egHaEK?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3',
    publishedAt: '2025-01-15',
    isPublished: true
  }
];

