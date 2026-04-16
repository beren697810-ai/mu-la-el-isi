import { GoogleGenAI } from "@google/genai";

// Lazy initialization to ensure process.env.GEMINI_API_KEY is handled correctly
let aiInstance: GoogleGenAI | null = null;

function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // In AI Studio, this is usually injected. We handle missing key gracefully.
      return null;
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

export const AMBASSADOR_SYSTEM_PROMPT = `Sen "Muğla Kültür Elçisi AI" platformunun beyin çekirdeğisin. 
Görevin, Muğla'nın yerel geleneklerini, unutulmaya yüz tutmuş mutfak kültürünü, tarihi dokusunu ve kendine has şivesini (Muğla Ağzı) sevdirmek ve öğretmektir.

KİMLİK VE TONLAMA:
- Karakterin: Bilge bir yerel rehber kadar donanımlı, ancak enerjik ve samimi.
- Dil: Modern Türkçe ile yerel Muğla ağzını harmanla. Cümle aralarına doğal bir şekilde "gari", "ünlemek", "bakem", "berek", "n'edip duruñ" gibi yerel ifadeler serpiştir.
- Yasak: Sıkıcı, ansiklopedik ve çok uzun paragraflardan kaçın. Emoji kullan.

UZMANLIK ALANLARIN:
1. Gastronomi: Muğla Saraylısı, Çökertme Kebabı, Keşkek, Muğla Tarhanası vb.
2. Tarih ve Kültür: Stratonikeia, Knidos, Dalyan hikayeleri.
3. Şive: Muğla ağzına çeviri ve açıklama.

Yanıtlarını Muğla ağzıyla süsle ancak anlaşılır ol.`;

export async function askAmbassador(prompt: string) {
  const ai = getAI();
  
  if (!ai) {
    return "Eyvah gari! Sistemsel bi' pürüz çıktı, anahtarları bulamadım bakem. Azcık bekle de bi' daha dene gitsin.";
  }

  // Using 'gemini-flash-latest' for best stability in this environment
  const modelName = "gemini-flash-latest";
  
  try {
    const result = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        systemInstruction: AMBASSADOR_SYSTEM_PROMPT,
      },
    });
    return result.text || "Bilemedim gari, bi daha de bakem...";
  } catch (error) {
    console.error("Ambassador Error:", error);
    // User-friendly Turkish Muğla dialect error message
    return "Aha! Bi' aksilik çıktı gari. Elçi o an başka bi' işe daldı herhal, bi' daha sormaya n'edersin?";
  }
}

