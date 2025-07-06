// //taskUtils.ts
// taskUtils.ts
import Constants from 'expo-constants';

export type TaskMetadata = {
  estimatedBrewTime: 15 | 25 | 45;
  isPriority: boolean;
};

export const getTaskMetadata = async (taskName: string): Promise<TaskMetadata> => {
  const OPENAI_API_KEY = Constants.expoConfig?.extra?.openaiKey;
  const ASSISTANT_ID = Constants.expoConfig?.extra?.openaiAssistantId;

  try {
    console.log('[TASK INPUT]', taskName);

    // Step 1: Create thread
    const threadRes = await fetch('https://api.openai.com/v1/threads', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2',
      },
    });

    const thread = await threadRes.json();
    console.log('[THREAD RESPONSE]', thread);

    const threadId = thread?.id;
    if (!threadId) throw new Error('Thread creation failed');

    // Step 2: Add message
    await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2',
      },
      body: JSON.stringify({
        role: 'user',
        content: taskName,
      }),
    });

    // Step 3: Run assistant
    const runRes = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2',
      },
      body: JSON.stringify({
        assistant_id: ASSISTANT_ID,
      }),
    });

    const run = await runRes.json();
    const runId = run?.id;
    if (!runId) throw new Error('Run creation failed');

    // Step 4: Poll for completion
    let status = 'queued';
    let retries = 0;
    const maxRetries = 10;

    while (status !== 'completed' && retries < maxRetries) {
      const runCheckRes = await fetch(
        `https://api.openai.com/v1/threads/${threadId}/runs/${runId}`,
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'OpenAI-Beta': 'assistants=v2',
          },
        }
      );

      const runCheck = await runCheckRes.json();
      status = runCheck?.status || 'undefined';
      console.log('[ASSISTANT STATUS]', status);

      if (status !== 'completed') {
        await new Promise((res) => setTimeout(res, 1000));
        retries++;
      }
    }

    // Step 5: Get assistant message
    const messagesRes = await fetch(
      `https://api.openai.com/v1/threads/${threadId}/messages`,
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'OpenAI-Beta': 'assistants=v2',
        },
      }
    );

    const messagesData = await messagesRes.json();
    console.log('[MESSAGES RESPONSE]', messagesData);

    if (!messagesData?.data || messagesData.data.length === 0) {
      throw new Error('No assistant message found');
    }

    const assistantMessage = messagesData.data.find(
      (msg: any) => msg.role === 'assistant'
    );

    const rawContent = assistantMessage?.content?.[0]?.text?.value;
    console.log('[OPENAI RAW]', rawContent);

    if (!rawContent) throw new Error('No content in assistant response.');

    const parsed: TaskMetadata = JSON.parse(rawContent);
    console.log('[AI METADATA]', parsed);

    return parsed;
  } catch (err: any) {
    console.error('[AI FALLBACK]', err);
    console.warn('[AI FALLBACK TRIGGERED]', err.message || err);
    console.log('Test value:', Constants.expoConfig?.extra?.testValue);
    return { estimatedBrewTime: 25, isPriority: false };
  }
};

// import Constants from 'expo-constants';

// export type TaskMetadata = {
//   estimatedBrewTime: number;
//   isPriority: boolean;
// };

// export const getTaskMetadata = async (taskName: string): Promise<TaskMetadata> => {
//   const OPENAI_API_KEY = Constants.expoConfig?.extra?.openaiKey;
//   const ASSISTANT_ID = Constants.expoConfig?.extra?.openaiAssistantId;

//   try {
//     console.log('[TASK INPUT]', taskName);

//     // Step 1: Create thread
//    const threadRes = await fetch('https://api.openai.com/v1/threads', {
//   method: 'POST',
//   headers: {
//     'Authorization': `Bearer ${OPENAI_API_KEY}`,
//     'Content-Type': 'application/json',
//   },
// });

// const thread = await threadRes.json();
// console.log('[THREAD RESPONSE]', thread); // <-- Add this;
//     const threadId = thread?.id;

//     if (!threadId) throw new Error('Thread creation failed');

//     // Step 2: Add message
//     await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${OPENAI_API_KEY}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         role: 'user',
//         content: taskName,
//       }),
//     });

//     // Step 3: Run assistant
//     const runRes = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs`, {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${OPENAI_API_KEY}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         assistant_id: ASSISTANT_ID,
//       }),
//     });

//     const run = await runRes.json();
//     const runId = run?.id;

//     if (!runId) throw new Error('Run creation failed');

//     // Step 4: Poll for completion
//     let status = 'queued';
//     let retries = 0;
//     const maxRetries = 10;

//     while (status !== 'completed' && retries < maxRetries) {
//       const runCheckRes = await fetch(
//         `https://api.openai.com/v1/threads/${threadId}/runs/${runId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${OPENAI_API_KEY}`,
//           },
//         }
//       );
//       const runCheck = await runCheckRes.json();

//       console.log('[RUN STATUS RESPONSE]', runCheck); // Add this!

//       status = runCheck?.status || 'undefined';
//       console.log('[ASSISTANT STATUS]', status);

//       if (status !== 'completed') {
//         await new Promise((res) => setTimeout(res, 1000));
//         retries++;
//       }
//     }

//     // Step 5: Get messages
//     const messagesRes = await fetch(
//       `https://api.openai.com/v1/threads/${threadId}/messages`,
//       {
//         headers: {
//           Authorization: `Bearer ${OPENAI_API_KEY}`,
//         },
//       }
//     );

//     const messagesData = await messagesRes.json();
//     console.log('[MESSAGES RESPONSE]', messagesData);

//     if (!messagesData?.data || messagesData.data.length === 0) {
//       throw new Error('No assistant message found');
//     }

//     const assistantMessage = messagesData.data.find(
//       (msg: any) => msg.role === 'assistant'
//     );

//     const rawContent = assistantMessage?.content?.[0]?.text?.value;
//     console.log('[OPENAI RAW]', rawContent);

//     if (!rawContent) throw new Error('No content in assistant response.');

//     const parsed: TaskMetadata = JSON.parse(rawContent);
//     console.log('[AI METADATA]', parsed);

//     return parsed;
//   } catch (err) {
//     console.error('[AI FALLBACK]', err);
//     console.warn('[AI FALLBACK TRIGGERED]', err.message || err);
    
//     return { estimatedBrewTime: 25, isPriority: false }; // fallback
    
//   }
// };

// // import Constants from 'expo-constants';

// // export type TaskMetadata = {
// //   estimatedBrewTime: number;
// //   isPriority: boolean;
// // };

// // export const getTaskMetadata = async (taskName: string): Promise<TaskMetadata> => {
// //   const OPENAI_API_KEY = Constants.expoConfig?.extra?.openaiKey;
// //   const ASSISTANT_ID = Constants.expoConfig?.extra?.openaiAssistantId;

// //   try {
// //     // Create a thread
// //     const threadRes = await fetch('https://api.openai.com/v1/threads', {
// //       method: 'POST',
// //       headers: {
// //         'Authorization': `Bearer ${OPENAI_API_KEY}`,
// //         'Content-Type': 'application/json',
// //       },
// //     });

// //     const thread = await threadRes.json();
// //     const threadId = thread.id;

// //     // Send user message
// //     await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
// //       method: 'POST',
// //       headers: {
// //         'Authorization': `Bearer ${OPENAI_API_KEY}`,
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify({
// //         role: 'user',
// //         content: taskName,
// //       }),
// //     });

// //     // Run the assistant
// //     const runRes = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs`, {
// //       method: 'POST',
// //       headers: {
// //         'Authorization': `Bearer ${OPENAI_API_KEY}`,
// //         'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify({
// //         assistant_id: ASSISTANT_ID,
// //       }),
// //     });

// //     const run = await runRes.json();

// //     // Poll until it's done
// //     let status = 'queued';
// //     let retries = 0;
// // const maxRetries = 10;

// // while (status !== 'completed' && retries < maxRetries) {
// //   const runCheck = await fetch(
// //     `https://api.openai.com/v1/threads/${threadId}/runs/${run.id}`,
// //     {
// //       headers: {
// //         Authorization: `Bearer ${OPENAI_API_KEY}`,
// //       },
// //     }
// //   );
// //   const runStatus = await runCheck.json();
// //   status = runStatus.status;

// //   if (status !== 'completed') {
// //     await new Promise((res) => setTimeout(res, 1000)); // wait 1 second
// //     retries++;
// //   }
// // }


// //     // Get the response
// //     const messagesRes = await fetch(
// //       `https://api.openai.com/v1/threads/${threadId}/messages`,
// //       {
// //         headers: {
// //           Authorization: `Bearer ${OPENAI_API_KEY}`,
// //         },
// //       }
// //     );

// //     const messagesData = await messagesRes.json();
// //    const assistantMessage = messagesData.data.find(
// //   (msg: any) => msg.role === 'assistant'
// // );

// // if (!assistantMessage) {
// //   throw new Error('No assistant message found.');
// // }

// // const responseText = assistantMessage.content?.[0]?.text?.value;
// // console.log('[OPENAI RAW]', responseText);

// // if (!responseText) throw new Error('No text content returned from assistant.');
// // return JSON.parse(responseText);

// //     console.log('[OPENAI RAW]', responseText);

// //     return JSON.parse(responseText);
// //   } catch (err) {
// //     console.error('Error fetching assistant response:', err);
// //     return { estimatedBrewTime: 25, isPriority: false }; // fallback
// //   }
// // };

// // // export const getTaskMetadata = async (taskName: string): Promise<TaskMetadata> => {
// // //   const OPENAI_API_KEY = Constants.expoConfig?.extra?.openaiKey;

// // //   console.log('[TASK INPUT]', taskName); // STEP 1: Log the input

// // //   try {
// // //     const response = await fetch('https://api.openai.com/v1/chat/completions', {
// // //       method: 'POST',
// // //       headers: {
// // //         'Content-Type': 'application/json',
// // //         Authorization: `Bearer ${OPENAI_API_KEY}`,
// // //       },
// // //       body: JSON.stringify({
// // //         model: 'gpt-3.5-turbo',
// // //         messages: [
// // //           {
// // //             role: 'user',
// // //             content: `You are a smart assistant in a cozy coffee-themed productivity app.
// // //                       Based on this task: "${taskName}", return a JSON object with:
// // //                       1. estimatedBrewTime (15, 25, or 45 only), and
// // //                       2. isPriority (true or false).
// // //                       Keep your response JSON only, like:
// // //                       { "estimatedBrewTime": 25, "isPriority": false }
// // //             `.trim(),
// // //           },
// // //         ],
// // //         temperature: 0.6,
// // //       }),
// // //     });

// // //     const data = await response.json();

// // //     console.log('[OPENAI RESPONSE]', data); // STEP 2: Log the entire response

// // //     const content = data.choices?.[0]?.message?.content || '{}';

// // //     console.log('[PARSED CONTENT]', content); // STEP 3: Log what you're about to parse
// // //     console.log('[OPENAI KEY]', OPENAI_API_KEY);

// // //     return JSON.parse(content);
// // //   } catch (error) {
// // //     console.error('[AI FALLBACK]', error); // STEP 4: Log any errors

// // //     return {
// // //       estimatedBrewTime: 25,
// // //       isPriority: false,
// // //     };
// // //   }

