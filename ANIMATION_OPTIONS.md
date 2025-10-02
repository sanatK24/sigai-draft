# 🎨 Card Animation Options for Core Team Section

## ✅ Currently Implemented: Option 1 - Staggered Fade-In

---

## 📋 All Available Animation Options

### **Option 1: Staggered Fade-In on Scroll** ⭐ *CURRENT*
**What it does:** Cards fade in and slide up sequentially as they scroll into view

**Code (Already Applied):**
```tsx
initial={{ opacity: 0, y: 50 }}
animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
transition={{ 
  duration: 0.6,
  delay: index * 0.15,
  ease: [0.25, 0.4, 0.25, 1]
}}
```

**Best for:** Professional, subtle, widely accepted
**Effect:** Smooth, elegant entrance

---

### **Option 2: 3D Flip Reveal**
**What it does:** Cards flip in 3D from back to front when scrolling

**Replace the motion.div props with:**
```tsx
initial={{ opacity: 0, rotateY: -90 }}
animate={isInView ? { opacity: 1, rotateY: 0 } : { opacity: 0, rotateY: -90 }}
transition={{ 
  duration: 0.8,
  delay: index * 0.2,
  ease: "easeOut"
}}
style={{ 
  perspective: '1000px',
  transformStyle: 'preserve-3d'
}}
```

**Best for:** Modern, tech-focused, attention-grabbing
**Effect:** Dramatic 3D entrance

---

### **Option 3: Scale & Bounce Entry**
**What it does:** Cards scale from small to normal with a playful bounce

**Replace the motion.div props with:**
```tsx
initial={{ opacity: 0, scale: 0.5 }}
animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
transition={{ 
  duration: 0.6,
  delay: index * 0.15,
  type: "spring",
  stiffness: 100,
  damping: 10
}}
```

**Best for:** Playful, energetic, youth-oriented
**Effect:** Bouncy, fun entrance

---

### **Option 4: Slide from Sides**
**What it does:** Odd cards slide from left, even cards from right

**Replace the motion.div props with:**
```tsx
initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
transition={{ 
  duration: 0.7,
  delay: index * 0.1,
  ease: [0.33, 1, 0.68, 1]
}}
```

**Best for:** Dynamic, engaging, rhythmic
**Effect:** Alternating slide-in

---

### **Option 5: Magnetic Hover + Parallax**
**What it does:** Cards follow cursor movement on hover with depth

**Add this inside CoreTeamCard component:**
```tsx
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
const cardRef = useRef<HTMLDivElement>(null);

const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  if (!cardRef.current) return;
  const rect = cardRef.current.getBoundingClientRect();
  const x = (e.clientX - rect.left - rect.width / 2) / 20;
  const y = (e.clientY - rect.top - rect.height / 2) / 20;
  setMousePosition({ x, y });
};

const handleMouseLeave = () => {
  setMousePosition({ x: 0, y: 0 });
};
```

**Replace the motion.div with:**
```tsx
<motion.div 
  ref={cardRef}
  className="relative min-w-[350px] h-[650px] flex-shrink-0 group mt-10"
  onMouseMove={handleMouseMove}
  onMouseLeave={handleMouseLeave}
  initial={{ opacity: 0, y: 50 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
  whileHover={{ 
    x: mousePosition.x, 
    y: mousePosition.y,
    transition: { type: "spring", stiffness: 150, damping: 15 }
  }}
  transition={{ duration: 0.6, delay: index * 0.15 }}
>
```

**Best for:** Interactive, immersive, premium feel
**Effect:** Cards "follow" your cursor

---

### **Option 6: Wave Effect**
**What it does:** Cards animate in a wave pattern

**Replace the motion.div props with:**
```tsx
initial={{ opacity: 0, y: 50, rotate: -5 }}
animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : { opacity: 0, y: 50, rotate: -5 }}
transition={{ 
  duration: 0.8,
  delay: index * 0.2,
  ease: [0.43, 0.13, 0.23, 0.96]
}}
```

**Best for:** Organic, flowing, artistic
**Effect:** Gentle wave motion

---

## 🎯 Recommendation Matrix

| Priority | Animation | When to Use |
|----------|-----------|-------------|
| ⭐⭐⭐⭐⭐ | Option 1 (Staggered Fade) | Professional sites, broad audience |
| ⭐⭐⭐⭐ | Option 5 (Magnetic Hover) | Premium, interactive experiences |
| ⭐⭐⭐ | Option 3 (Scale Bounce) | Youth-focused, energetic brands |
| ⭐⭐⭐ | Option 4 (Slide Sides) | Dynamic, content-heavy sections |
| ⭐⭐ | Option 2 (3D Flip) | Tech showcases, attention-grabbing |
| ⭐⭐ | Option 6 (Wave) | Creative, artistic presentations |

---

## 🔧 How to Switch Animations

1. Open `speakers-section.tsx`
2. Find the `CoreTeamCard` component
3. Locate the `<motion.div` tag (around line 275)
4. Replace the `initial`, `animate`, and `transition` props
5. Save and test!

---

## 🎨 Combining Animations

You can also **mix effects**! For example:

**Staggered Fade + Scale:**
```tsx
initial={{ opacity: 0, y: 50, scale: 0.9 }}
animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
```

**3D Flip + Fade:**
```tsx
initial={{ opacity: 0, rotateY: -45, y: 30 }}
animate={isInView ? { opacity: 1, rotateY: 0, y: 0 } : { opacity: 0, rotateY: -45, y: 30 }}
```

---

## 💡 Performance Tips

1. Use `once: true` in `useInView` to prevent re-animations
2. Keep `duration` between 0.4-0.8 seconds
3. Stagger delay should be 0.1-0.2 seconds per card
4. Test on mobile devices for performance

---

## 🚀 Advanced: Custom Timing Functions

```tsx
// Smooth ease
ease: [0.25, 0.4, 0.25, 1]

// Bounce
ease: [0.68, -0.55, 0.265, 1.55]

// Elastic
type: "spring", stiffness: 100, damping: 10

// Snappy
ease: [0.33, 1, 0.68, 1]
```

---

Made with ❤️ for RAIT ACM SIGAI Student Chapter
