self.__MIDDLEWARE_MATCHERS = [
  {
    "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next|static|favicon\\.ico|.*\\.(?:css|js|ts|tsx|json|svg|ico|png|jpg|jpeg|gif|webp|woff2?|ttf|eot|otf|xml|txt|map)$).*))(\\\\.json)?[\\/#\\?]?$",
    "originalSource": "/((?!_next|static|favicon\\.ico|.*\\.(?:css|js|ts|tsx|json|svg|ico|png|jpg|jpeg|gif|webp|woff2?|ttf|eot|otf|xml|txt|map)$).*)"
  }
];self.__MIDDLEWARE_MATCHERS_CB && self.__MIDDLEWARE_MATCHERS_CB()