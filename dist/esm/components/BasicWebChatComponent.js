import _pt from "prop-types";
import React, { useState, useEffect } from 'react';
import WebChat from './WebChat';
import Configuration from '../utils/Configuration';
import DirectLine from '../utils/DirectLine';
export default function BasicWebChatComponent({
  rawConfig
}) {
  const [directLine, setDirectline] = useState(null);
  useEffect(() => {
    if (!directLine) {
      initialDirectLine();
    }
  }, [directLine]);

  const generateDirectLine = async rawConfig => {
    const config = await Configuration.initial(rawConfig);
    const directline = await DirectLine.createDirectLine(config.directLineOptions);
    return directline;
  };

  const initialDirectLine = async () => {
    const directline = await generateDirectLine(rawConfig);
    setDirectline(directline);
  };

  return /*#__PURE__*/React.createElement(WebChat, {
    config: rawConfig,
    directLine: directLine
  });
}
//# sourceMappingURL=BasicWebChatComponent.js.map