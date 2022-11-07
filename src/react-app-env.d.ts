/// <reference types="react-scripts" />

import { Tweet } from './lib/utils'

declare global {
  interface Window {
    YTD?: {
      tweets?: Record<string, { tweet: Tweet }>;
      tweet?: Window['YTD']['tweets']
    }
  }
}
