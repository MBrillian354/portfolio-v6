import React, { useState, useEffect } from 'react';

/**
 * CustomCursor Component - Highly customizable cursor with gradient circle effect
 * 
 * @param {number} size - Circle diameter in pixels (default: 40)
 * @param {string} lightColor - Base color for light mode (default: light blue)
 * @param {string} darkColor - Base color for dark mode (default: white)
 * @param {string} lightStartColor - Starting gradient color for light mode (overrides lightColor if provided)
 * @param {string} lightEndColor - Ending gradient color for light mode (overrides lightColor if provided)
 * @param {string} darkStartColor - Starting gradient color for dark mode (overrides darkColor if provided)
 * @param {string} darkEndColor - Ending gradient color for dark mode (overrides darkColor if provided)
 * @param {string} gradientDirection - Direction of gradient: 'out-to-in' or 'in-to-out' (default: 'out-to-in')
 * @param {number} gradientStops - Number of gradient stops for smoothness (default: 8, min: 2, max: 20)
 * @param {number} hoverScale - Scale multiplier on hover (default: 1.5)
 * @param {Array<number>} fadeStops - Gradient stop percentages [start, mid, end] (default: [0, 40, 70])
 * @param {Array<number>} opacityStops - Opacity values for each stop [start, mid, end] (default: [0.6, 0.3, 0.1])
 * @param {number} hoverOpacityBoost - Additional opacity on hover (default: 0.2)
 * @param {number} transitionDuration - Animation duration in seconds (default: 0.1)
 * 
 * @description
 * Supports multiple color formats:
 * - RGBA: "rgba(59, 130, 246, 0.8)"
 * - RGB: "rgb(59, 130, 246)"
 * - Hex: "#3b82f6", "#3b82f6cc", "#3bf", "#3bf8"
 * - OKLCH: "oklch(60% 0.15 250, 0.8)"
 * 
 * @example
 * // Default usage
 * <CustomCursor />
 * 
 * @example
 * // Custom gradient with hex colors
 * <CustomCursor 
 *   size={60}
 *   lightStartColor="#3b82f6cc"
 *   lightEndColor="#9333eaaa"
 *   darkStartColor="#ffffff"
 *   darkEndColor="#6b7280"
 *   gradientDirection="in-to-out"
 *   hoverScale={2}
 * />
 * 
 * @example
 * // Mixed color formats
 * <CustomCursor 
 *   lightStartColor="rgba(59, 130, 246, 0.8)"
 *   lightEndColor="#9333ea80"
 *   darkStartColor="#fff"
 *   darkEndColor="oklch(21% 0.034 264.665, 0.8)"
 * />
 */
const CustomCursor = ({ 
  size = 40,
  lightColor = 'rgba(59, 130, 246, 0.6)', // Light blue (fallback)
  darkColor = 'rgba(255, 255, 255, 0.8)', // White (fallback)
  lightStartColor = null, // Custom start color for light mode
  lightEndColor = null, // Custom end color for light mode
  darkStartColor = null, // Custom start color for dark mode
  darkEndColor = null, // Custom end color for dark mode
  gradientDirection = 'out-to-in', // 'out-to-in' or 'in-to-out'
  gradientStops = 8, // Number of gradient stops (2-20)
  hoverScale = 1.5,
  fadeStops = [0, 40, 70], // Gradient fade percentages
  opacityStops = [0.6, 0.3, 0.1], // Opacity values for each stop
  hoverOpacityBoost = 0.2, // Additional opacity on hover
  transitionDuration = 0.1 // Animation duration in seconds
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.tagName === 'BUTTON' || 
                           target.tagName === 'A' || 
                           target.getAttribute('role') === 'button' ||
                           target.hasAttribute('tabindex') ||
                           target.type === 'button' ||
                           target.type === 'submit' ||
                           getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(isInteractive);
    };

    // Add event listeners
    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Enhanced color parsing to support multiple formats
  const parseColor = (colorString) => {
    // Handle rgba/rgb
    const rgbaMatch = colorString.match(/rgba?\(([^)]+)\)/);
    if (rgbaMatch) {
      const values = rgbaMatch[1].split(',').map(v => v.trim());
      return {
        r: parseInt(values[0]),
        g: parseInt(values[1]),
        b: parseInt(values[2]),
        a: values[3] ? parseFloat(values[3]) : 1,
        format: 'rgba'
      };
    }
    
    // Handle hex colors (#fff, #ffffff, #fff8, #ffffff80)
    const hexMatch = colorString.match(/^#([0-9a-fA-F]{3,8})$/);
    if (hexMatch) {
      const hex = hexMatch[1];
      let r, g, b, a = 1;
      
      if (hex.length === 3) {
        // #fff -> #ffffff
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
      } else if (hex.length === 4) {
        // #fff8 -> #ffffff88
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
        a = parseInt(hex[3] + hex[3], 16) / 255;
      } else if (hex.length === 6) {
        // #ffffff
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
      } else if (hex.length === 8) {
        // #ffffff80
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
        a = parseInt(hex.substring(6, 8), 16) / 255;
      }
      
      return {
        r: r,
        g: g,
        b: b,
        a: a,
        format: 'hex'
      };
    }
    
    // Handle oklch format
    const oklchMatch = colorString.match(/oklch\(([^)]+)\)/);
    if (oklchMatch) {
      // For OKLCH, we'll pass it through as-is since CSS supports it
      // Extract the alpha if provided
      const params = oklchMatch[1].split(',').map(v => v.trim());
      const alpha = params.length > 3 ? parseFloat(params[3]) : 1;
      return {
        original: colorString,
        a: alpha,
        format: 'oklch'
      };
    }
    
    return null;
  };

  // Generate advanced gradient with enhanced color support and smooth feathering
  const generateAdvancedGradient = (mode = 'light', isHover = false) => {
    const boostMultiplier = isHover ? 1 + hoverOpacityBoost : 1;
    const adjustedOpacities = opacityStops.map(opacity => 
      Math.min(opacity * boostMultiplier, 1)
    );

    // Determine which colors to use
    let startColor, endColor;
    if (mode === 'light') {
      startColor = lightStartColor || lightColor;
      endColor = lightEndColor || lightColor;
    } else {
      startColor = darkStartColor || darkColor;
      endColor = darkEndColor || darkColor;
    }

    const startParsed = parseColor(startColor);
    const endParsed = parseColor(endColor);

    // Enhanced gradient stops for smoother feathering
    const createSmoothGradient = () => {
      let gradientStopsArray = [];
      
      // Clamp gradient stops between 2 and 20 for performance and quality
      const numStops = Math.max(2, Math.min(20, gradientStops));
      
      // Generate positions based on number of stops
      const generatePositions = (stops) => {
        if (stops === 2) {
          return [0, 100]; // Simple: center to edge
        }
        
        const positions = [0]; // Always start at center
        
        if (stops <= 5) {
          // For few stops, use linear distribution
          for (let i = 1; i < stops - 1; i++) {
            positions.push((i / (stops - 1)) * 100);
          }
        } else {
          // For many stops, use exponential distribution for natural falloff
          for (let i = 1; i < stops - 1; i++) {
            const ratio = i / (stops - 1);
            // Exponential curve: more stops near the center, fewer at edges
            const exponentialRatio = Math.pow(ratio, 0.7);
            positions.push(exponentialRatio * 100);
          }
        }
        
        positions.push(100); // Always end at edge
        return positions.map(pos => Math.round(pos));
      };
      
      const positions = generatePositions(numStops);
      
      for (let i = 0; i < numStops; i++) {
        const position = positions[i];
        let opacity;
        
        // Calculate opacity with exponential falloff for natural feathering
        if (position <= fadeStops[0]) {
          opacity = adjustedOpacities[0];
        } else if (position <= fadeStops[1]) {
          const ratio = (position - fadeStops[0]) / (fadeStops[1] - fadeStops[0]);
          opacity = adjustedOpacities[0] * (1 - ratio) + adjustedOpacities[1] * ratio;
        } else if (position <= fadeStops[2]) {
          const ratio = (position - fadeStops[1]) / (fadeStops[2] - fadeStops[1]);
          opacity = adjustedOpacities[1] * (1 - ratio) + adjustedOpacities[2] * ratio;
        } else {
          // Ultra-smooth fadeout beyond the last stop
          const fadeOutRatio = (position - fadeStops[2]) / (100 - fadeStops[2]);
          opacity = adjustedOpacities[2] * Math.pow(1 - fadeOutRatio, 2.5); // Exponential falloff
        }
        
        // Determine which color to use based on direction and position
        let colorToUse;
        if (gradientDirection === 'in-to-out') {
          // Center uses endColor, edges use startColor
          const colorRatio = position / 100;
          if (startParsed?.format === 'oklch' || endParsed?.format === 'oklch') {
            // For OKLCH, blend the alpha values
            if (position < 50) {
              colorToUse = endColor.replace(/,\s*[\d.]+\s*\)/, `, ${opacity})`);
            } else {
              colorToUse = startColor.replace(/,\s*[\d.]+\s*\)/, `, ${opacity})`);
            }
          } else if (startParsed && endParsed) {
            const r = Math.round(endParsed.r * (1 - colorRatio) + startParsed.r * colorRatio);
            const g = Math.round(endParsed.g * (1 - colorRatio) + startParsed.g * colorRatio);
            const b = Math.round(endParsed.b * (1 - colorRatio) + startParsed.b * colorRatio);
            colorToUse = `rgba(${r}, ${g}, ${b}, ${opacity})`;
          }
        } else {
          // Default: out-to-in
          const colorRatio = position / 100;
          if (startParsed?.format === 'oklch' || endParsed?.format === 'oklch') {
            if (position < 50) {
              colorToUse = startColor.replace(/,\s*[\d.]+\s*\)/, `, ${opacity})`);
            } else {
              colorToUse = endColor.replace(/,\s*[\d.]+\s*\)/, `, ${opacity})`);
            }
          } else if (startParsed && endParsed) {
            const r = Math.round(startParsed.r * (1 - colorRatio) + endParsed.r * colorRatio);
            const g = Math.round(startParsed.g * (1 - colorRatio) + endParsed.g * colorRatio);
            const b = Math.round(startParsed.b * (1 - colorRatio) + endParsed.b * colorRatio);
            colorToUse = `rgba(${r}, ${g}, ${b}, ${opacity})`;
          }
        }
        
        if (colorToUse) {
          gradientStopsArray.push(`${colorToUse} ${position}%`);
        }
      }
      
      return gradientStopsArray;
    };

    const smoothStops = createSmoothGradient();
    return `radial-gradient(circle, ${smoothStops.join(', ')})`;
  };

  const cursorStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: `${size}px`,
    height: `${size}px`,
    transform: `translate(-50%, -50%) ${isHovering ? `scale(${hoverScale})` : 'scale(1)'}`,
    transition: `opacity 0.2s , transform ${transitionDuration}s ease-out`,
    '--light-gradient': generateAdvancedGradient('light', isHovering),
    '--dark-gradient': generateAdvancedGradient('dark', isHovering),
  };

  return (
    <div
      className="custom-cursor visible"
      style={cursorStyle}
    />
  );
};

export default CustomCursor;
