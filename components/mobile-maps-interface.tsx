"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

interface MobileMapsInterfaceProps {
  children: React.ReactNode;
  onInputSubmit?: (input: string) => void;
  input?: string;
  setInput?: (input: string) => void;
  isLoading?: boolean;
}

export function MobileMapsInterface({
  children,
  onInputSubmit,
  input = "",
  setInput,
  isLoading = false,
}: MobileMapsInterfaceProps) {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputFocus = () => {
    setShowKeyboard(true);
  };

  const handleInputBlur = () => {
    // Delay hiding keyboard to allow for interactions
    setTimeout(() => setShowKeyboard(false), 100);
  };

  const handleInputSubmit = () => {
    if (input.trim() && onInputSubmit) {
      onInputSubmit(input.trim());
      setInput?.("");
      setShowKeyboard(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className="relative w-full max-w-[430px] mx-auto h-screen max-h-[932px] bg-white overflow-hidden rounded-[54px] shadow-2xl border-8 border-gray-800">
      {/* iPhone Bezel */}
      <div className="absolute inset-0 w-full h-full">
        {/* Status Bar */}
        <div className="flex justify-between items-center px-[10px] pt-[18px] pb-[13px] relative z-50">
          <div className="flex items-center">
            <div className="text-black font-semibold text-[18px] leading-[23px] tracking-[-0.44px]">
              1:47
            </div>
          </div>

          {/* Dynamic Island */}
          <div className="w-[126px] h-[37px] bg-[#FBFAF5] rounded-[100px] flex items-center justify-center">
            <div className="w-[8px] h-[8px] bg-black rounded-full opacity-20"></div>
          </div>

          <div className="flex items-center gap-[3px]">
            {/* Cellular Signal */}
            <svg width="23" height="15" viewBox="0 0 23 15" fill="none">
              <g clipPath="url(#clip0_291_2519)">
                <path d="M19.5151 14.4102H21.5322C22.0469 14.4102 22.3955 14.0449 22.3955 13.5054V0.904785C22.3955 0.365234 22.0469 0 21.5322 0H19.5151C19.0005 0 18.6436 0.365234 18.6436 0.904785V13.5054C18.6436 14.0449 19.0005 14.4102 19.5151 14.4102Z" fill="black"/>
                <path d="M13.3062 14.4107H15.3066C15.8213 14.4107 16.1782 14.0454 16.1782 13.5059V4.18408C16.1782 3.64453 15.8213 3.2793 15.3066 3.2793H13.3062C12.7832 3.2793 12.4346 3.64453 12.4346 4.18408V13.5059C12.4346 14.0454 12.7832 14.4107 13.3062 14.4107Z" fill="black"/>
                <path d="M7.08887 14.4097H9.08936C9.6123 14.4097 9.96094 14.0444 9.96094 13.5049V7.18799C9.96094 6.64844 9.6123 6.2832 9.08936 6.2832H7.08887C6.56592 6.2832 6.21729 6.64844 6.21729 7.18799V13.5049C6.21729 14.0444 6.56592 14.4097 7.08887 14.4097Z" fill="black"/>
                <path d="M0.871582 14.4102H2.87207C3.39502 14.4102 3.74365 14.0449 3.74365 13.5054V9.77832C3.74365 9.23877 3.39502 8.88184 2.87207 8.88184H0.871582C0.348633 8.88184 0 9.23877 0 9.77832V13.5054C0 14.0449 0.348633 14.4102 0.871582 14.4102Z" fill="black"/>
              </g>
            </svg>

            {/* WiFi */}
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <path d="M9.55546 13.8037C9.73808 13.8037 9.8958 13.7207 10.2195 13.4053L12.2449 11.4629C12.3694 11.3384 12.4026 11.1557 12.2864 11.0063C11.7469 10.3091 10.7259 9.70312 9.55546 9.70312C8.35185 9.70312 7.33085 10.334 6.7913 11.0561C6.7083 11.189 6.7415 11.3384 6.87431 11.4629L8.8914 13.4053C9.21513 13.7124 9.37285 13.8037 9.55546 13.8037Z" fill="black"/>
            </svg>

            {/* Battery */}
            <svg width="31" height="14" viewBox="0 0 31 14" fill="none">
              <path d="M4.86287 11.5222H22.8804C23.844 11.5222 24.4169 11.3715 24.7809 11.0074C25.145 10.64 25.3031 10.0638 25.3031 9.09946V4.86897C25.3031 3.89798 25.145 3.32843 24.7843 2.96105C24.4169 2.60033 23.8373 2.44629 22.8804 2.44629H4.93173C3.90263 2.44629 3.30902 2.597 2.95904 2.95772C2.59831 3.3251 2.44019 3.91872 2.44019 4.93041V9.09946C2.44019 10.0738 2.59831 10.64 2.95904 11.0074C3.32642 11.3681 3.90596 11.5222 4.86287 11.5222Z" fill="black"/>
            </svg>
          </div>
        </div>

        {/* Maps Background */}
        <div className="absolute inset-0 bg-[#FCFBF2] overflow-hidden">
          {/* Forest Areas */}
          <div className="absolute w-full h-full">
            <svg className="absolute left-[21px] top-[325px] w-[785px] h-[1002px]" viewBox="0 0 430 778" fill="none">
              <path d="M562.5 774L568 770L613 772L575.5 974L-171.5 1001.5L-168.5 33L-135 0.5L-129 2.5L-124 3.5V8L-126.5 12L-126 18.5L-128 19.5L-122 27H-118.5L-113.5 31L-109.5 40L-106.5 32L-109.5 20.5L-103 18.5L-97.5 16L-96 8.5L-97 4.5L-96 3H-93L-90 0.5L-79 0L-78 1.5H-73.5L-76.5 6.5L-75.5 13L-73.5 12.5L-72 10L-73.5 6.5L-69 2.5L-70 12.5L-71 17L-65.5 19.5V23H-69L-75 25L-71 35.5H-66L-62 38L-57.5 44L-55.5 48L-48.5 50.5L-49 52L-52 51L-58.5 50.5H-64.5L-72 52.5H-78L-80.5 55.5L-73.5 54L-65.5 52.5H-54L-47 54.5L-42.5 65.5L-41 64.5L-45 54.5H-42.5L-38 60.5L-39.5 67L-44 77L-47 78L-51 75.5L-53 77L-47 82L-39.5 90L-34.5 86H-28.5L-24 85L-20 87L-15.5 88.5H-9.5V95L-6.5 91L-2 95L1.5 100L-1 102.5L-9.5 105.5L-15.5 104.5L-24 100L-30 106.5L-24 103.5L-20 106.5L-21 115L-24 111.5V115L-21 120H-18L-15.5 125.5L-8 133L-2 143L4.5 141.5L2 138.5L-4 135.5L-3 129L3 135L3.5 133.5L1.5 128.5L7.5 124.5L11 128.5L14.5 127L18.5 126.5L20.5 129L19.5 134L16 139.5L24 139L30 137.5L34 133L34.5 127.5L38 128.5L36 135.5L33 140.5L27.5 142L27 144L21.5 145L12.5 143.5L3.5 145.5L3 150.5L8 151.5L11.5 155.5V160.5L14.5 165L9.5 172L8 177H3.5L-2 182.5V187L3.5 190L9.5 192L8 197.5L3.5 203.5L-1 201V208.5L18 222L19.5 219L16.5 214.5L22.5 208.5L21 203L23.5 205H27L25 201L24 192L28 196.5L34.5 197.5L35 201L32.5 203.5L38.5 210L37.5 219L36 223.5L40.5 222L39 215.5L42.5 213L40.5 206L46.5 206.5L44.5 209.5V213L48 217L56.5 224.5L76 239.5L72 243L76 245L84 236L87 243L81 247.5L84 250.5V255L87 258V252H91.5V258H98V262L103 266.5V271.5L107.5 276.5L115 274.5L120 266.5L127 264L137 270L134.5 272.5L143.5 274.5L141 278L133.5 275.5V281.5L137 285L148.5 288L160.5 283L171 281.5L180.5 273.5L188.5 265.5L186.5 258L190 255L195.5 252L199.5 248L202.5 241.5L204.5 236L209.5 235.5V234L213 233.5H220.5L216.5 239.5L206.5 247.5L211 250.5L206.5 255H204L199 258L194.5 266.5L199 270L207.5 260.5L211.5 262L209.5 266.5L202.5 270L204 274.5L211.5 278L215.5 275.5L220 278V270L223.5 271.5V276.5L227 279L236.5 280L231.5 288L227 289.5H222.5V294.5L231.5 303L235.5 301.5L241.5 303L243 307L258 321.5L271 307L279 314.5L283.5 309.5V301.5L281.5 298L282.5 305.5H279L274.5 301.5L277.5 295.5L281.5 293L283.5 297L287 299.5L285 306.5L287 309.5L288.5 307L295 308.5L297.5 312V316.5L299 320.5L302 324L308 327L306 329.5L304 333.5L299.5 331.5V326L295.5 319.5L288.5 320L283.5 324L281.5 328V335.5L287 345.5L288.5 351L270 362L265 373.5L269.5 383.5H274V376.5L272 377L268.5 373.5V368L271.5 365.5L277 368L283 369H288.5L295 376L299.5 376.5L304 383.5L307 379L308.5 373L311 366.5L314 365.5L318 368L318.5 376L314 387H319.5L325.5 391L333 395.5L334.5 400L337 410.5L341.5 419.5L340.5 426.5L342 429.5L341.5 431L339.5 430L333 436L337.5 443L342.5 441.5L339.5 436L344 430L350 433.5L349 436L351 439.5L349 441.5L352.5 444.5L344.5 447L342.5 453L352.5 458L349 464L351 466.5L348.5 471H352.5L356 467.5L363 474L367.5 475V467.5L373.5 464.5L369.5 456.5L373.5 454.5L376 461.5L385 469L395 464.5L399 467.5L388.5 478L385 486L397 503.5L404 513.5V507L408.5 511L411 506H417.5L421.5 509L423.5 502.5H427.5L425.5 511L430 517L439 522.5L440 535L423.5 543.5L425.5 547.5L421.5 552L427.5 555L430 561V570H437.5L440 580.5L448 579L453 577.5L449 571.5L451.5 567L453 562L457.5 561L455 556L458.5 546L455 537V533H458.5L460.5 542.5L464.5 544.5V550.5L462 555L458.5 553.5V557L463.5 561L460.5 566L455 570L460.5 574L464.5 584.5L462 591L464.5 594L478 610H492L501.5 619L500.5 622.5L497.5 622L496 626H499.5L502 629.5L498 638L499.5 640L502 638L506.5 637.5V642H503L500 644.5L505.5 647.5L498 656L498.5 665L494 668.5L501.5 674L500 681.5H495L492.5 684.5L495 690L481 697.5L480 701L483 703.5V701L486 699H494V695L498.5 692.5H504.5L509 695L508 702L504.5 711L503 720.5L509 716.5L508 723.5L514 722.5L517.5 729.5L527.5 727L530.5 737L534 738L539 735L542 737V741.5V750.5L544 759.5L536 763.5L538 766H542L544.5 763L549 758.5L552.5 754L555.5 755.5L552.5 758.5L554.5 759L555.5 763H553.5V766L556.5 770L562.5 774Z" fill="#C8F19F"/>
            </svg>
          </div>

          {/* Water Areas */}
          <div className="absolute w-full h-full">
            <svg className="absolute left-[16px] top-[-3px] w-[749px] h-[645px]" viewBox="0 0 430 470" fill="none">
              <path d="M-132.5 -11.5L-137.5 -10.5H-154L-176.5 -174.5L49 -161.5L296.5 -142.5L302.5 -134L286.5 -126V-122L299.5 -124.5L304 -122L311 -120L313.5 -106.5V-97L321.5 -95.5H330.5L342 -92L359.5 -88.5L368 -84.5L372.5 -80.5L370.5 -74L372.5 -68.5L383 -72.5L380.5 -63.5V-51.5L396 -49.5L402.5 -58L408.5 -63.5L411.5 -62L406 -55.5L399.5 -35L394 -20.5L397.5 -4L412.5 124.5L425.5 133L465.5 154L470 158L465.5 166L460.5 178L471 183.5V189.5L473.5 202.5H479.5L502 217H513.5L529 219.5L534.5 223.5H543.5V221H534.5L547.5 208L542.5 202.5L543.5 208L533 218L519.5 214L517 215.5L507.5 212L504 215.5L482 200.5L485.5 191.5L509.5 182L518 189.5L513 201.5L514 202.5L533 173.5L562 186.5L556 199L550.5 209L562 221V208L572.5 214L569 447.5L549 443.5L543.5 438H538H532V432.5L524.5 431.5L506.5 425L500 422L488 425L483 427L486 424L481 417.5V411.5L478.5 408.5L473 413.5L471.5 410.5L469 411.5L470 419.5L452 424L445 430L446 470L442.5 469V427L429 424L423 415L414 420.5V433L407.5 435.5V451.5L405 449L404 436.5L393 416.5L387.5 409.5L380 404.5L372.5 402.5L367 409.5L356 397.5L362 391L356 388H347L339.5 376.5L347 370.5L350.5 384.5L362 373L364.5 355L356 350L344.5 355L343.5 342L338.5 330.5L331 333L330 341L331 354L319 355V350L328.5 347.5L325.5 338L321.5 327.5L328.5 311.5L323.5 297L315.5 285.5L305 272.5L293 276.5L288 266.5L281 268L279.5 264H271V268L268 275L247.5 274L220.5 266.5L209.5 263.5L206 260.5H193L167 257H153.5L140 250.5V244.5L143 226.5L149.5 209L153.5 203.5L165.5 204.5L171 199.5L186.5 198L189 195L184.5 193.5L183.5 196.5L175.5 198L171 196.5L176.5 191.5H171L159.5 184.5L156 183.5L151.5 191.5L146.5 193.5L144 196.5L143 207.5L138.5 220L142.5 223V225L140 226.5L136.5 223L133 215L124 216.5L119.5 220L127.5 226.5L130 236L136.5 233L135.5 242H127.5L126 239L117 246L112.5 243L120.5 239H115L119.5 236H126V234H119.5V232H123V230H118V228L121.5 226.5L119.5 225L115 228L117 233L115 234H106.5L99 236L94 233L98 230H109.5L106.5 226.5L101 218V224L98 228L90.5 230L86 228L84 220L86 213L88 209L84 210L80.5 209L71.5 208L69.5 205.5L65.5 197.5L63.5 190.5L64.5 180.5V173L67 164.5L68 158L74.5 147L84 142.5L94 138L99 131.5L103 123.5L105 117L111.5 109.5L109.5 103L105 98V95L102 93L98 91L93 93L86 91H76.5V93L79.5 98H91.5L99 100L93 102L84 101H78V106.5L74.5 113.5L72.5 111L68 114.5L59.5 124.5L58 127.5H53L49 124.5H43.5L41 129.5L42.5 137L39.5 142.5H35.5L29 141L26.5 147L21 153H14L6.5 142.5L0 135.5L-1.5 130.5L1 124.5L1.5 118.5L0 112.5L-2.5 107.5H-8L-12 103L-14 98L-11 93.5L-10 90L-12 89L-15 92L-21 91L-23 86H-19L-15 88L-9 86L-5.5 88V93.5L-9 95L-10 98L-8 100L-2.5 101L1.5 107.5L5 113.5L6.5 121.5L1.5 132L5 137L13 139.5L14 148L18 150L22 148L25 141L29 138H35.5L37 135.5L38.5 124.5L42.5 120L49 117L45 113.5L41 111L35.5 115.5L30 121.5L24 120L19 117L18 111L17 104.5L12 100L13 96L12 92L8 87V81.5L13 78L18 77L24 81.5L30 84.5H38.5L45 79V73.5V65.5L39.5 60.5L37 56.5H32L26.5 59L25 54L29 49.5L34.5 52L43.5 55.5L49 61.5L50.5 70V80.5L43.5 84.5L34.5 87L29 89L22 88L19 91L16 95L19 100L21 106.5L22 112.5H27.5L33 114.5L34.5 111L33 104.5L39.5 103L46.5 102L50.5 106.5L53 101L62.5 91L69.5 81.5L65 65.5L59 54L43.5 41L32 34.5L25 38.5L13 43L1 42L-8 36.5L-23 40L-26.5 45.5L-21 43L-18 45.5L-16.5 49L-11 53L-16.5 59.5L-22 61.5H-25V65.5L-21 70L-25 74L-26.5 79L-21 83H-28L-29 78L-28 74L-25 71L-29 67L-32 61.5L-28.5 58H-25L-18 56.5L-16.5 54L-18 51H-24H-28L-30.5 49L-29 46.5L-32 43L-38.5 41L-39.5 31H-49L-56 33.5L-65 21.5L-83 0.5L-85 -10.5H-91L-102 -4L-117 -2.5V-16H-123V-0.5L-137.5 0.5V-4L-125.5 -5V-13L-132.5 -15V-11.5Z" fill="#8EDBFA"/>
            </svg>
          </div>

          {/* Map elements like city dots, roads, labels */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Primary city dot */}
            <div className="absolute left-[215px] top-[520px] w-[3px] h-[3px] rounded-full border-[0.33px] border-white/80 bg-black"></div>

            {/* Secondary city dots */}
            <div className="absolute left-[171px] top-[495px] w-[3px] h-[3px] rounded-full border-[0.33px] border-white/80 bg-gray-400"></div>
            <div className="absolute left-[293px] top-[470px] w-[3px] h-[3px] rounded-full border-[0.33px] border-white/80 bg-gray-400"></div>

            {/* Sample road signs */}
            <div className="absolute left-[250px] top-[400px] w-[24px] h-[24px] bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">101</span>
            </div>

            {/* City labels */}
            <div className="absolute left-[220px] top-[535px] text-xs font-medium text-black stroke-white stroke-1">
              San Mateo
            </div>
            <div className="absolute left-[295px] top-[490px] text-xs font-medium text-gray-600 stroke-white stroke-1">
              Redwood City
            </div>
          </div>
        </div>

        {/* Chat Content Area */}
        <div className="absolute inset-x-0 top-[100px] bottom-[200px] overflow-y-auto px-4 mobile-chat-container">
          {children}
        </div>

        {/* Tab Bar */}
        <div className="absolute left-[45px] top-[67px] w-[344px] h-[78px] bg-[rgba(195,195,195,0.33)] rounded-[51px] backdrop-blur-sm shadow-[0px_5.443px_21.317px_0px_rgba(0,0,0,0.25)] flex items-center justify-center gap-1 px-[4.535px]">
          {["Home", "Profile", "Explore"].map((tab, index) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex flex-col items-center justify-center w-[108.85px] h-full px-[4.535px] py-[11.339px] rounded-[67px] gap-[4.535px] transition-all ${
                activeTab === tab
                  ? "bg-[rgba(0,0,0,0.31)] backdrop-blur-sm"
                  : ""
              }`}
            >
              <div className="text-white text-[19px] leading-normal font-medium">
                {index === 0 ? "􀎟" : index === 1 ? "􀉬" : "􀆪"}
              </div>
              <div className="text-white text-[16px] leading-normal font-semibold">
                {tab}
              </div>
            </button>
          ))}
        </div>

        {/* Input Field */}
        <div className="absolute left-[50px] top-[525px] w-[299px] h-[40px]">
          <div className="w-full h-full rounded-[32px] border border-[#E5E5EA] bg-white" />
          <div className="absolute left-[15px] top-[7px] w-[2px] h-[26px] rounded-[2px] bg-[#3036C2]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask Ride..."
            value={input}
            onChange={(e) => setInput?.(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyPress={(e) => e.key === "Enter" && handleInputSubmit()}
            className="absolute left-[15px] top-[9px] w-[250px] h-[23px] bg-transparent border-none outline-none text-[17px] leading-[22px] placeholder:text-[rgba(60,60,60,0.3)]"
          />
        </div>

        {/* Plus Button */}
        <button className="absolute left-[15px] top-[529px] w-[35px] h-[34px]">
          <svg width="36" height="35" viewBox="0 0 36 35" fill="none">
            <ellipse cx="17.6285" cy="17.0471" rx="17.6285" ry="17.0471" fill="#F5F5F5"/>
          </svg>
          <svg className="absolute left-[7px] top-[6px] w-[22px] h-[21px]" viewBox="0 0 22 21" fill="none">
            <path d="M11 0V21M0 10.5H22" stroke="black" strokeWidth="2"/>
          </svg>
        </button>

        {/* Recording Button */}
        <button className="absolute left-[370px] top-[530px] w-[33px] h-[32px]">
          <svg width="34" height="32" viewBox="0 0 34 32" fill="none">
            <ellipse cx="16.5267" cy="15.9817" rx="16.5267" ry="15.9817" fill="black"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M16.6667 8C14.8257 8 13.3333 9.49238 13.3333 11.3333V17.1667C13.3333 19.0076 14.8257 20.5 16.6667 20.5C18.5076 20.5 20 19.0076 20 17.1667V11.3333C20 9.49238 18.5076 8 16.6667 8Z" fill="white"/>
            <path d="M11.6667 15.5C11.6667 15.0398 11.2936 14.6667 10.8333 14.6667C10.3731 14.6667 10 15.0398 10 15.5V17.1667C10 20.5669 12.5455 23.3726 15.8349 23.7819C15.8339 23.7989 15.8333 23.8161 15.8333 23.8333V24.6667H13.3333C12.8731 24.6667 12.5 25.0398 12.5 25.5C12.5 25.9602 12.8731 26.3333 13.3333 26.3333H20C20.4602 26.3333 20.8333 25.9602 20.8333 25.5C20.8333 25.0398 20.4602 24.6667 20 24.6667H17.5V23.8333C17.5 23.8161 17.4995 23.7989 17.4984 23.7819C20.7878 23.3726 23.3333 20.5669 23.3333 17.1667V15.5C23.3333 15.0398 22.9602 14.6667 22.5 14.6667C22.0398 14.6667 21.6667 15.0398 21.6667 15.5V17.1667C21.6667 19.9281 19.4281 22.1667 16.6667 22.1667C13.9052 22.1667 11.6667 19.9281 11.6667 17.1667V15.5Z" fill="white"/>
          </svg>
        </button>

        {/* Keyboard Interface (conditionally shown) */}
        {showKeyboard && (
          <div className="absolute left-0 top-[574px] w-full h-[358px] bg-gradient-to-b from-[#DEDEDE] to-[#DEDEDE] rounded-t-[60px] backdrop-blur-[50px] border-t border-gray-300">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() => setShowKeyboard(false)}
                  className="px-4 py-2 bg-[#ABB0BA] rounded text-black"
                >
                  Done
                </button>
                <button
                  onClick={handleInputSubmit}
                  className="px-4 py-2 bg-blue-500 rounded text-white"
                  disabled={!input.trim() || isLoading}
                >
                  Send
                </button>
              </div>
              <div className="text-center text-gray-600">
                Virtual keyboard would appear here
              </div>
            </div>
          </div>
        )}

        {/* Home Indicator */}
        <div className="absolute bottom-[21px] left-1/2 transform -translate-x-1/2 w-[139px] h-[5px] rounded-[100px] bg-black opacity-60" />
      </div>
    </div>
  );
}
