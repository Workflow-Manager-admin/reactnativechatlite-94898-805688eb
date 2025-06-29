#!/bin/bash
cd /home/kavia/workspace/code-generation/reactnativechatlite-94898-805688eb/chat_ui_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

