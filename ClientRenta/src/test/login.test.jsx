import React from 'react'; // ← Esto faltaba
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
// Ajusta la ruta según donde esté tu componente RegisterLogin
import RegisterLogin from '../components/RegisterLogin'; // Ajusta esta ruta

// Mock de los componentes hijos si es necesario
vi.mock('../components/Login', () => ({
  default: () => <div data-testid="login-component">Login Component</div>
}));

vi.mock('../components/Register', () => ({
  default: () => <div data-testid="register-component">Register Component</div>
}));

describe('RegisterLogin', () => {
  let container;
  let registerButton;
  let loginButton;

  beforeEach(() => {
    vi.clearAllMocks();
    const renderResult = render(<RegisterLogin />);
    container = renderResult.container;
    registerButton = screen.getByText('Registrate aquí');
    loginButton = screen.getByText('Inicia sesión aquí');
  });

  it('should render component without crashing', () => {
    expect(container).toBeTruthy();
  });

  it('should have default container class initially', () => {
    const containerDiv = container.querySelector('.container');
    expect(containerDiv).toBeTruthy();
    expect(containerDiv.classList.contains('active')).toBe(false);
  });

  it('should display all toggle elements', () => {
    expect(registerButton).toBeTruthy();
    expect(loginButton).toBeTruthy();
  });

  it('should toggle to active state when register button is clicked', () => {
    fireEvent.click(registerButton);
    const containerDiv = container.querySelector('.container');
    expect(containerDiv.classList.contains('active')).toBe(true);
  });

  it('should toggle back to default state when login button is clicked', () => {
    // Primero activar
    fireEvent.click(registerButton);
    // Luego desactivar
    fireEvent.click(loginButton);
    const containerDiv = container.querySelector('.container');
    expect(containerDiv.classList.contains('active')).toBe(false);
  });

  it('should handle multiple toggle clicks correctly', () => {
    const containerDiv = container.querySelector('.container');
    
    // Click register
    fireEvent.click(registerButton);
    expect(containerDiv.classList.contains('active')).toBe(true);
    
    // Click login
    fireEvent.click(loginButton);
    expect(containerDiv.classList.contains('active')).toBe(false);
    
    // Click register again
    fireEvent.click(registerButton);
    expect(containerDiv.classList.contains('active')).toBe(true);
  });

  it('should have correct button classes', () => {
    expect(registerButton.classList.contains('toggle')).toBe(true);
    expect(loginButton.classList.contains('toggle')).toBe(true);
  });

  it('should have correct toggle panel structure', () => {
    const togglePanels = container.querySelectorAll('.toggle-panel');
    expect(togglePanels.length).toBeGreaterThan(0);
  });
});