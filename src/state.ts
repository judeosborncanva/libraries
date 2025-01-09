import { computed, signal, effect } from "@preact/signals-react";

export const wbExpandedSignal = signal<boolean>(false);
export const adjustmentsExpandedSignal = signal<boolean>(false);
export const adjustmentExpandedContentSignal = signal<any[]>([]);
export const selectedGrandPillSignal = signal<string>("");

// Add this effect to watch for grand pill changes
effect(() => {
  // Reading the value triggers the effect when it changes
  selectedGrandPillSignal.value;
  // Reset the adjustments expanded state
  adjustmentsExpandedSignal.value = false;
});

// Update the page headline based on the selected grand pill
export const pageHeadlineSignal = computed<string>(() => {
  const currentTab = selectedGrandPillSignal.value;
  currentAdjustments.value = initialAdjustmentsMap[currentTab];
  switch (currentTab) {
    case "":
      return "What will you <span>design</span> today?";
    case "templates":
      return "How would you like to <span>start</span> today?";
    case "make-an-image":
      return "How would you like to <span>start</span> today?";
    case "search":
      return "How would you like to <span>start</span> today?";
    case "design-with-ai":
      return "What will you <span>design</span> today?";
    case "widget":
      return "What will you <span>design</span> today?";
    default:
      return "What will you <span>design</span> today?";
  }
});

// Update the input placeholder based on the selected grand pill
export const inputPlaceholderSignal = computed<string>(() => {
  const currentTab = selectedGrandPillSignal.value;
  switch (currentTab) {
    case "":
      return "Search & Discover Canva";
    case "templates":
      return "Search thousands of templates";
    case "make-an-image":
      return "Describe your ideal image";
    case "search":
      return "Search designs, folders and uploads from you and your team";
    case "design-with-ai":
      return "Describe your ideal design";
    case "widget":
      return "Create a widget";
    default:
      return "What would you like to design?";
  }
});

export const selectedAdjustmentSignal = signal<string>("");

export const currentAdjustments = signal<any[]>();

export const setAdjustment = (id: string) => {
  console.log("[State] setAdjustment", id);
  adjustmentsExpandedSignal.value = false;

  if (!initialAdjustmentsMap[id]) {
    return;
  }
  selectedAdjustmentSignal.value = id;
  currentAdjustments.value = initialAdjustmentsMap[id];
};

export const selectedFilterSignal = signal<any[]>([]);

export const setSelectedFilter = (id: string) => {
  if (initialFiltersMap.value[id]) {
    selectedFilterSignal.value = initialFiltersMap.value[id];
    adjustmentsExpandedSignal.value = true;
  }
};

export const initialAdjustmentsMap = {
  templates: [
    {
      icon: "💍",
      label: "Plan a wedding",
      isActive: false,
      type: "pill",
      id: "plan-a-wedding",
    },
    {
      icon: "✏️",
      label: "Create a logo",
      isActive: false,
      type: "pill",
      id: "create-a-logo",
    },
    {
      icon: "👨‍👩‍👦‍👦",
      label: "Social media",
      isActive: false,
      type: "pill",
      id: "templates.social-media",
    },
    {
      icon: "🖨️",
      label: "Print material",
      isActive: false,
      type: "pill",
      id: "templates.print-material",
    },
    {
      icon: "🎥",
      label: "Video",
      isActive: false,
      type: "pill",
      id: "video",
    },
    {
      icon: "📊",
      label: "Presentation",
      isActive: false,
      type: "pill",
      id: "presentation",
    },
  ],
  search: [
    {
      label: "Category",
      isActive: false,
      type: "filter",
      id: "category",
    },
    {
      label: "Owner",
      isActive: false,
      type: "filter",
      id: "owner",
    },
    {
      label: "Date modified",
      isActive: false,
      type: "filter",
      id: "date-modified",
    },
  ],
  "make-an-image": [
    {
      icon: "🖼️",
      label: "Add Image",
      isActive: false,
      type: "pill",
      id: "add-image",
    },
    {
      label: "Style",
      isActive: false,
      type: "filter",
      id: "style",
    },
    {
      label: "Size",
      isActive: false,
      type: "filter",
      id: "size",
    },
  ],
  "design-with-ai": [
    {
      icon: "🎉",
      label: "Plan an event",
      isActive: false,
      type: "pill",
      id: "plan-an-event",
    },
    {
      icon: "🎓",
      label: "Create a learning activity",
      isActive: false,
      type: "pill",
      id: "design-with-ai.create-a-learning-activity",
    },
    {
      icon: "🎓",
      label: "Create a TikTok video",
      isActive: false,
      type: "pill",
      id: "design-with-ai.create-a-tiktok-video",
    },
    {
      icon: "💡",
      label: "Learn what I can design",
      isActive: false,
      type: "pill",
      id: "design-with-ai.learn-what-i-can-design",
    },
  ],
  widget: [
    {
      icon: "🖼️",
      label: "Add a reference image",
      isActive: false,
      type: "pill",
      id: "widget.add-a-reference-image",
    },
    {
      icon: "💡",
      label: "Learn what I can creates",
      isActive: false,
      type: "pill",
      id: "widget.learn-what-i-can-create",
    },
  ],
  // sub view
  "templates.social-media": [
    {
      icon: "👨‍👩‍👦‍👦",
      label: "Social media",
      isActive: true,
      type: "pill",
      id: "social-media",
    },
    {
      label: "Format",
      isActive: false,
      type: "filter",
      id: "templates.social-media.format",
    },
    {
      label: "Style",
      isActive: false,
      type: "filter",
      id: "templates.social-media.style",
    },
    {
      label: "Color",
      isActive: false,
      type: "filter",
      id: "color",
    },
  ],
  "templates.print-material": [
    {
      icon: "🖨️",
      label: "Print material",
      isActive: true,
      type: "pill",
      id: "print-material",
    },
    {
      label: "Range",
      isActive: false,
      type: "filter",
      id: "templates.print-material.range",
    },
    {
      label: "Style",
      isActive: false,
      type: "filter",
      id: "style",
    },
    {
      label: "Color",
      isActive: false,
      type: "filter",
      id: "color",
    },
  ],
  "design-with-ai.create-a-learning-activity": [
    {
      icon: "🎓",
      label: "Create a learning activity",
      isActive: true,
      type: "pill",
      id: "design-with-ai.create-a-learning-activity",
    },
    {
      label: "Format",
      isActive: false,
      type: "filter",
      id: "learning-activity.format",
    },
    {
      label: "Grade level",
      isActive: false,
      type: "filter",
      id: "grade-level",
    },
    {
      label: "Subject",
      isActive: false,
      type: "filter",
      id: "subject",
    },

    {
      icon: "💡",
      label: "Learn what I can design",
      isActive: false,
      type: "pill",
      id: "design-with-ai.learn-what-i-can-design",
    },
  ],
  "design-with-ai.create-a-tiktok-video": [
    {
      icon: "👨‍👩‍👦‍👦",
      label: "Create a TikTok video",
      isActive: true,
      type: "pill",
      id: "design-with-ai.create-a-tiktok-video",
    },
    {
      label: "Format",
      isActive: false,
      type: "filter",
      id: "format",
    },
    {
      label: "Style",
      isActive: false,
      type: "filter",
      id: "style",
    },
    {
      label: "Color",
      isActive: false,
      type: "filter",
      id: "color",
    },
  ],
};

export const initialFiltersMap = signal<any>({
  "templates.social-media.format": [
    {
      id: "format-1",
      src: "images/format/0.png",
      label: "Instagram Post 1:1",
      type: "image",
    },
    {
      id: "format-2",
      src: "images/format/1.png",
      label: "Instagram Post 4:5",
      type: "image",
    },
    {
      id: "format-3",
      src: "images/format/2.png",
      label: "Instagram Reel",
      type: "image",
    },
    {
      id: "format-4",
      src: "images/format/3.png",
      label: "Instagram Story",
      type: "image",
    },
    {
      id: "format-5",
      src: "images/format/4.png",
      label: "TikTok Video",
      type: "image",
    },
    {
      id: "format-6",
      src: "images/format/5.png",
      label: "Facebook Post",
      type: "image",
    },
    {
      id: "format-7",
      src: "images/format/6.png",
      label: "LinkedIn Post",
      type: "image",
    },
  ],
  "templates.print-material.range": [
    {
      id: "range-0",
      src: "images/print-material/range/image-0.png",
      label: "Banners (Portrait)",
      type: "image",
    },
    {
      id: "range-1",
      src: "images/print-material/range/image-1.png",
      label: "Banners (Landscape)",
      type: "image",
    },
    {
      id: "range-2",
      src: "images/print-material/range/image-2.png",
      label: "Bound Documents",
      type: "image",
    },
    {
      id: "range-3",
      src: "images/print-material/range/image-3.png",
      label: "Business Cards (Landscape)",
      type: "image",
    },
    {
      id: "range-4",
      src: "images/print-material/range/image-4.png",
      label: "Hoodies",
      type: "image",
    },
    {
      id: "range-5",
      src: "images/print-material/range/image-5.png",
      label: "Mugs",
      type: "image",
    },
    {
      id: "range-6",
      src: "images/print-material/range/image-6.png",
      label: "Tote Bags",
      type: "image",
    },
    {
      id: "range-7",
      src: "images/print-material/range/image-7.png",
      label: "T-Shirts",
      type: "image",
    },
    {
      id: "range-8",
      src: "images/print-material/range/image-8.png",
      label: "Yard Signs",
      type: "image",
    },
    {
      id: "range-9",
      src: "images/print-material/range/image-9.png",
      label: "Notebooks",
      type: "image",
    },
  ],
  style: [
    {
      id: "style-0",
      src: "images/styles/style-0.png",
      label: "Default",
      type: "image",
    },
    {
      id: "style-1",
      src: "images/styles/style-1.png",
      label: "Retrowave",
      type: "image",
    },
    {
      id: "style-2",
      src: "images/styles/style-2.png",
      label: "Filmic",
      type: "image",
    },
    {
      id: "style-3",
      src: "images/styles/style-3.png",
      label: "Soft focus",
      type: "image",
    },
    {
      id: "style-4",
      src: "images/styles/style-4.png",
      label: "Minimalist",
      type: "image",
    },
    {
      id: "style-5",
      src: "images/styles/style-5.png",
      label: "Moody",
      type: "image",
    },
    {
      id: "style-6",
      src: "images/styles/style-6.png",
      label: "3D",
      type: "image",
    },
    {
      id: "style-7",
      src: "images/styles/style-7.png",
      label: "Concept art",
      type: "image",
    },
    {
      id: "style-8",
      src: "images/styles/style-8.png",
      label: "Psychedelic",
      type: "image",
    },
    {
      id: "style-9",
      src: "images/styles/style-9.png",
      label: "Vibrant",
      type: "image",
    },
    {
      id: "style-10",
      src: "images/styles/style-10.png",
      label: "High flash",
      type: "image",
    },
    {
      id: "style-11",
      src: "images/styles/style-11.png",
      label: "Long exposure",
      type: "image",
    },
    {
      id: "style-12",
      src: "images/styles/style-12.png",
      label: "Anime",
      type: "image",
    },
    {
      id: "style-13",
      src: "images/styles/style-13.png",
      label: "Dreamy",
      type: "image",
    },
  ],
  "grade-level": [
    {
      id: "grade-1",
      label: "Grade 1",
      type: "pill",
    },
    {
      id: "grade-2",
      label: "Grade 2",
      type: "pill",
    },
    {
      id: "grade-3",
      label: "Grade 3",
      type: "pill",
    },
    {
      id: "grade-4",
      label: "Grade 4",
      type: "pill",
    },
    {
      id: "grade-5",
      label: "Grade 5",
      type: "pill",
    },
    {
      id: "grade-6",
      label: "Grade 6",
      type: "pill",
    },
    {
      id: "grade-7",
      label: "Grade 7",
      type: "pill",
    },
  ],
  "learning-activity.format": [
    {
      id: "format-1",
      label: "",
      src: "images/learning-format/show-me-what-you-got.png",
      type: "image",
    },
    {
      id: "format-2",
      label: "",
      src: "images/learning-format/visual-thinking.png",
      type: "image",
    },
    {
      id: "format-3",
      label: "",
      src: "images/learning-format/text-based.png",
      type: "image",
    },
    {
      id: "format-4",
      label: "",
      src: "images/learning-format/quiz.png",
      type: "image",
    },
  ],
});
