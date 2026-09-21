'use client';
import { useState } from 'react';
import Link from 'next/link';
import GlobalHeader from './GlobalHeader';

export default function Skill9Template({
  pageTitle,
  breadcrumbParent,
  breadcrumbParentLink,
  breadcrumbCurrent,
  sapo,
  bgRight,
  subFolders,
  contentMap
}) {
  const [selectedFolder, setSelectedFolder] = useState(subFolders[0]?.id || 'seo');
  const data = contentMap[selectedFolder] || contentMap[subFolders[0]?.id];

  return (
    <div 
      className="split-screen-container" 
      style={{ display: 'flex', width: '100vw', minHeight: '100vh', position: 'relative', backgroundColor: 'var(--color-cream)', paddingTop: '84px', boxSizing: 'border-box' }}
    >
      <GlobalHeader />

      {/* Mảng Sáng (Trái) */}
      <div className="pane-left" style={{ flex: 1, position: 'relative', paddingTop: '36px', paddingBottom: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Breadcrumb (Plain Text) */}
        <div style={{
          alignSelf: 'flex-start',
          marginLeft: '10%',
          fontFamily: 'var(--font-sans)',
          fontSize: '14px',
          color: 'var(--color-text-dark)',
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          marginBottom: '20px',
          opacity: 0.8
        }}>
          <Link href={breadcrumbParentLink} style={{ color: 'inherit', textDecoration: 'none' }}>{breadcrumbParent}</Link>
          <span>&gt;</span>
          <span style={{ fontWeight: 'bold', opacity: 1 }}>{breadcrumbCurrent}</span>
        </div>

        {/* Tiêu đề & Sapo giới thiệu tổng quan */}
        <div style={{
          width: '80%',
          maxWidth: '800px',
          marginTop: '10px',
          marginBottom: '20px',
          textAlign: 'left'
        }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '42px', color: 'var(--color-text-dark)', marginBottom: '15px' }}>
            {pageTitle}
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', lineHeight: '1.6', color: '#555', textAlign: 'justify' }}>
            {sapo}
          </p>
        </div>

        {/* Lưới Thư Mục Con (Grid) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          columnGap: '20px',
          rowGap: '15px',
          marginTop: '25px',
          width: '90%',
          maxWidth: '800px'
        }}>
          {subFolders.map((folder, idx) => {
            const isSelected = selectedFolder === folder.id;
            
            // Tinh chỉnh lại độ xô lệch nhẹ hơn để tiết kiệm không gian theo chiều dọc
            const organicOffsets = [
              { mt: '0px', ml: '0px', rot: '-3deg' },
              { mt: '15px', ml: '-10px', rot: '4deg' },
              { mt: '-10px', ml: '10px', rot: '-5deg' },
              { mt: '10px', ml: '-5px', rot: '6deg' },
              { mt: '-15px', ml: '15px', rot: '-4deg' },
              { mt: '10px', ml: '-15px', rot: '3deg' },
              { mt: '0px', ml: '10px', rot: '-2deg' },
              { mt: '5px', ml: '-5px', rot: '2deg' }
            ];
            const currentOffset = organicOffsets[idx] || organicOffsets[0];

            return (
            <div 
              key={folder.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                marginTop: currentOffset.mt,
                marginLeft: currentOffset.ml,
                transform: `rotate(${currentOffset.rot})`, 
              }}
              onMouseEnter={(e) => { 
                e.currentTarget.style.transform = `rotate(${currentOffset.rot}) translateY(-8px) scale(1.05)`; 
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.transform = `rotate(${currentOffset.rot})`; 
              }}
              onClick={() => setSelectedFolder(folder.id)}
              className="folder-item"
            >
              <div style={{ position: 'relative', width: '70px', height: '70px', marginBottom: '12px' }}>
                <img loading="lazy" 
                  src="/images/icon 1.svg" 
                  alt={folder.name} 
                  style={{ 
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
                    opacity: isSelected ? 0 : 1, 
                    transform: isSelected ? 'scale(0.8)' : 'scale(1)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.05))' 
                  }} 
                />
                <img loading="lazy" 
                  src="/images/icon 2.svg" 
                  alt={folder.name + " active"} 
                  style={{ 
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
                    opacity: isSelected ? 1 : 0, 
                    transform: isSelected ? 'scale(1)' : 'scale(0.8)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.1))' 
                  }} 
                />
              </div>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 'bold',
                fontSize: '12px',
                color: isSelected ? 'var(--color-accent)' : 'var(--color-text-dark)',
                textAlign: 'center',
                letterSpacing: '0.5px',
                transition: 'color 0.3s'
              }}>
                {folder.name}
              </span>
            </div>
          )})}
        </div>

        {/* Mục "Kiến thức gốc" */}
        <div style={{
          width: '80%',
          maxWidth: '800px',
          marginTop: '30px',
          marginBottom: '30px',
          padding: '25px',
          backgroundColor: '#fff',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
        }}>
          <h3 style={{ 
            fontFamily: 'var(--font-sans)', 
            fontWeight: 'bold',
            fontSize: '20px', 
            color: 'var(--color-text-dark)', 
            marginBottom: '15px',
            borderBottom: '2px solid var(--color-cream)',
            paddingBottom: '10px'
          }}>
            KIẾN THỨC GỐC
          </h3>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            {(data?.articles || []).map((article, idx) => (
              <li key={idx} style={{ marginBottom: '12px' }}>
                <a 
                  href={article.link} 
                  style={{ 
                    fontFamily: 'var(--font-sans)', 
                    fontSize: '15px', 
                    color: '#555', 
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#555'}
                >
                  <span style={{ color: 'var(--color-accent)', marginTop: '2px' }}>•</span>
                  <span>{article.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mảng Tối (Phải) */}
      <div 
        className="pane-right" 
        style={{
          flex: 1,
          backgroundColor: '#111',
          backgroundImage: `url("${bgRight}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center'
        }}
      >
        <div style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(20, 20, 20, 0.8)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          zIndex: 2,
          animation: 'fadeIn 0.3s ease-in-out'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            padding: '40px',
            gap: '30px',
            color: '#fff',
            alignItems: 'center',
            justifyContent: 'flex-start',
            overflowY: 'auto'
          }}>
            <div style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left', marginTop: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: '800', fontSize: '32px', color: 'var(--color-cream)', margin: 0 }}>
                  {data?.title}
                </h2>
                <button style={{
                  backgroundColor: 'var(--color-cream)',
                  color: 'var(--color-text-dark)',
                  border: 'none',
                  padding: '10px 25px',
                  borderRadius: '25px',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(248, 245, 240, 0.2)',
                  transition: 'transform 0.2s, background-color 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.backgroundColor = '#e8e2d5'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.backgroundColor = 'var(--color-cream)'; }}
                >
                  Dùng skill
                </button>
              </div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', lineHeight: '1.6', color: '#ccc', textAlign: 'justify', marginTop: '6px' }}>
                {data?.desc}
              </p>
            </div>
            <div style={{ width: '100%', maxWidth: '500px' }}>
              <img loading="lazy" 
                src="/images/Drone_viewing_sea_surface_2K_20260916224021.jpeg" 
                alt="Minh họa" 
                style={{ width: '100%', height: 'auto', maxHeight: '300px', borderRadius: '15px', objectFit: 'cover', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }} 
              />
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .folder-item {
          transition: transform 0.2s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
